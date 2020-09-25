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
import DashboardCards from "../components/DashboardCards";

class DashboardView extends Component {
  render() {
    return (
      <div>
        <DashboardCards />
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
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardView;
