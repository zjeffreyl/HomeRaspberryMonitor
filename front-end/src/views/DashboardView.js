import React, { Component } from "react";
import { CardBody, CardHeader, CardTitle, Card, Col, Row } from "reactstrap";
import { Line } from "react-chartjs-2";
import DataCard from "../components/DataCard";
import { dashboard24HoursPerformanceChart } from "../variables/performanceChart";
import { fetchServerReports } from "../actions/serverReportActions";
import { fetchRecords } from "../actions/recordActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

class DashboardView extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    serverReports: PropTypes.array.isRequired,
    fetchServerReports: PropTypes.func.isRequired,
    fetchRecords: PropTypes.func.isRequired,
  };

  state = {
    ping: 0,
    download: 0,
    upload: 0,
  };

  componentDidMount() {
    this.props.fetchServerReports();
    this.props.fetchRecords();
    this.getAverageOfMostRecent();
  }

  //calculate the average of the most recent serverReports for each record
  getAverageOfMostRecent() {
    var sum_ping = 0;
    var sum_download = 0;
    var sum_upload = 0;
    var record_ids = this.props.records.map((record) => record.id);
    for (var i = 0; i < record_ids.length; i++) {
      console.log(record_ids[i]);
      axios
        .get(
          `http://localhost:8080/api/serverReport/report_record/${record_ids[i]}`
        )
        .then((res) => {
          console.log(res.data);
          sum_ping += res.data[0].ping;
          sum_download += res.data[0].download;
          sum_upload += res.data[0].average;
        })
        .catch((err) => console.log(err));
    }
    console.log(sum_ping);
  }

  render() {
    const { ping, download, upload } = this.state;
    return (
      <div>
        <Row>
          <DataCard type="ping" value={ping} />
          <DataCard type="download" value={download} />
          <DataCard type="upload" value={upload} />
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

function mapStateToProps(state) {
  return {
    records: state.records.records,
    serverReports: state.serverReports.serverReports,
  };
}

export default connect(mapStateToProps, {
  fetchServerReports,
  fetchRecords,
})(DashboardView);
