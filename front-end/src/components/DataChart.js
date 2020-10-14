import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Input } from "reactstrap";
import "chart.js";
import { setChartToPing, setChartToDownload, setChartToUpload } from "../actions/chartAction";
import { connect } from "react-redux";
import { LocalDateToUTC } from "../utilities/conversions";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const measurements = ["Ping", "Download", "Upload"];

class DataChart extends Component {

  state = {
    dropDownValue: "",
    options: {
      title: {
        text: ""
      },
      xAxis: {
        dateTimeLabelFormats: {
          hour: '%l %p',
        },
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      time: {
        timezoneOffset: 0
      },
      series: this.props.currentData
    }
  };

  static propTypes = {
    options: PropTypes.object.isRequired,
    setChartToPing: PropTypes.func.isRequired,
    setChartToDownload: PropTypes.func.isRequired,
    setChartToUpload: PropTypes.func.isRequired,
  };

  componentDidMount() {

    var current = LocalDateToUTC(new Date());
    var tsYesterday = LocalDateToUTC(new Date(Date.now() - 86400 * 1000));
    this.props.setChartToPing(tsYesterday, current);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var current = LocalDateToUTC(new Date());
    var tsYesterday = LocalDateToUTC(new Date(Date.now() - 86400 * 1000));
    switch (e.target.value) {
      case "Ping":
        this.props.setChartToPing(tsYesterday, current);
        return;
      case "Download":
        this.props.setChartToDownload(tsYesterday, current);
        return;
      case "Upload":
        this.props.setChartToUpload(tsYesterday, current);
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
  setChartToPing, setChartToDownload, setChartToUpload
})(DataChart);
