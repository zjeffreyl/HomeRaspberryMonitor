import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Input } from "reactstrap";
import "chart.js";
import { fetchDataFromStartToEnd, setChartToPing, setChartToDownload, setChartToUpload } from "../actions/chartAction";
import { connect } from "react-redux";
import { LocalDateToUTC } from "../utilities/conversions";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const measurements = ["Ping", "Download", "Upload"];

class DataChart extends Component {
  state = {
    dropDownValue: "",
  };

  static propTypes = {
    options: PropTypes.object.isRequired,
    fetchDataFromStartToEnd: PropTypes.func.isRequired,
    setChartToPing: PropTypes.func.isRequired,
    setChartToDownload: PropTypes.func.isRequired,
    setChartToUpload: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var current = LocalDateToUTC(new Date());
    var tsYesterday = LocalDateToUTC(new Date(Date.now() - 86400 * 1000));
    this.props.fetchDataFromStartToEnd(tsYesterday, current);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    switch (e.target.value) {
      case "Ping":
        this.props.setChartToPing();
        return;
      case "Download":
        this.props.setChartToDownload();
        return;
      case "Upload":
        this.props.setChartToUpload();
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle md="3">
              <Input type="select" onChange={this.onChange} name="dropDownValue" value={this.state.dropDownValue}>
                {measurements.map((item, index) => (
                  <option id={index} key={index}>
                    {item}
                  </option>
                ))}
              </Input>
            </CardTitle>
            <CardBody>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.props.options}
              />
            </CardBody>
          </CardHeader>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.chart.options,
});

export default connect(mapStateToProps, {
  fetchDataFromStartToEnd,
  setChartToPing, setChartToDownload, setChartToUpload
})(DataChart);
