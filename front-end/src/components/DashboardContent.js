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
            <DashboardCards {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DataChart {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}
