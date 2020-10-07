import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import DashboardCards from "./DashboardCards";
import DataChart from "./DataChart";

export default class DashboardContent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <DashboardCards />
          </Col>
        </Row>
        <Row>
          <Col>
            <DataChart />
          </Col>
        </Row>
      </div>
    );
  }
}
