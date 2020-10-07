import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Input } from "reactstrap";
import { Line } from "react-chartjs-2";
import { dashboard24HoursPerformanceChart } from "../variables/performanceChart";
import { fetchDataFromStartToEnd } from "../actions/serverReportActions";
import { connect } from "react-redux";
import { LocalDateToUTC } from "../conversions";

const measurements = ["Ping", "Download", "Upload"];
class DataChart extends Component {
  state = {
    dropDownValue: measurements[0],
    dropdownOpen: false,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    var current = LocalDateToUTC(new Date());
    var tsYesterday = LocalDateToUTC(new Date(Date.now() - 86400 * 1000));

    this.props.fetchDataFromStartToEnd(tsYesterday, current);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ dropDownValue: e.target.value });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle md="3">
              <Input type="select" onClick={this.onChange}>
                {measurements.map((item, index) => {
                  return (
                    <option id={index} key={index}>
                      {item}
                    </option>
                  );
                })}
              </Input>
            </CardTitle>
            <CardBody>
              <Line
                data={dashboard24HoursPerformanceChart.data}
                options={dashboard24HoursPerformanceChart.options}
                width={400}
                height={100}
              />
            </CardBody>
          </CardHeader>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartData: state.serverReports.chartData,
});
export default connect(mapStateToProps, {
  fetchDataFromStartToEnd,
})(DataChart);
