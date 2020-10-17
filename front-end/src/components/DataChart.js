import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Input } from "reactstrap";
import "chart.js";
import {
  setChartToPing, setChartToDownload, setChartToUpload
} from "../actions/chartAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const measurements = ["Ping", "Download", "Upload"];
class DataChart extends Component {

  state = {
    dropDownValue: "",
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    options: PropTypes.object.isRequired,
    setChartToPing: PropTypes.func.isRequired,
    setChartToDownload: PropTypes.func.isRequired,
    setChartToUpload: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setChartToPing(this.props.id);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.props.id);
    switch (e.target.value) {
      case "Ping":
        this.props.setChartToPing(this.props.id);
        return;
      case "Download":
        this.props.setChartToDownload(this.props.id);
        return;
      case "Upload":
        this.props.setChartToUpload(this.props.id);
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


function mapStateToProps(state, props) {
  //get the correct options to display
  return {
    options: state.chart.chartTabsById[props.id],
  }
}

export default connect(mapStateToProps, { setChartToPing, setChartToDownload, setChartToUpload })(DataChart);
