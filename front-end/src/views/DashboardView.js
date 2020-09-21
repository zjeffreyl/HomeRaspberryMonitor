import React, { Component } from "react";
import { CardBody, CardHeader, CardTitle, Card, Col, Row } from "reactstrap";
import { Line } from "react-chartjs-2";
import DataCard from "../components/DataCard";
import { dashboard24HoursPerformanceChart } from "../variables/performanceChart";
import { fetchServerReports } from "../actions/serverReportActions";
import { fetchRecords } from "../actions/recordActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { UTCDefaultToLocalTimeZone } from "../conversions";
import axios from "axios";

class DashboardView extends Component {
  static propTypes = {
    fetchServerReports: PropTypes.func.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    records: PropTypes.array.isRequired,
    serverReports: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchServerReports();
    this.props.fetchRecords();
  }

  componentDidUpdate() {
    this.getAverageOfMostRecent();
  }

  //calculate the average of the most recent serverReports for each record
  getAverageOfMostRecent() {
    var record_ids = this.props.records.map((record) => record.id);
    for (var i = 0; i < record_ids.length; i++) {
      axios
        .get(
          `http://localhost:8080/api/serverReport/report_record/${record_ids[i]}`
        )
        .then((res) => {
          console.log(res.data);
        });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <DataCard type="ping" />
          <DataCard type="download" />
          <DataCard type="upload" />
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Record Averages from the last N times</CardTitle>
                <Row>
                  <Col>
                    <p>Last 24 hours</p>
                  </Col>
                </Row>
                <CardBody>
                  {/* <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  /> */}
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  serverReports: state.serverReports.serverReports,
  records: state.records.records,
});

export default connect(mapStateToProps, {
  fetchServerReports,
  fetchRecords,
})(DashboardView);
