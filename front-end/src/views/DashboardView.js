import React, { Component } from "react";
import { CardBody, CardHeader, CardTitle, Card, Col, Row } from "reactstrap";
import DataCard from "../components/DataCard";

class DashboardView extends Component {
  render() {
    return (
      <div>
        <Row>
          <DataCard />
          <DataCard />
          <DataCard />
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Record Averages from the last N times</CardTitle>
                <p>Last 24 hours</p>
                <CardBody></CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardView;
