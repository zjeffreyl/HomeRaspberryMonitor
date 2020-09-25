import React, { Component } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export class DataCard extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div>
                <i src="" />
              </div>
            </Col>
            <Col>
              <div>
                <p>{this.props.type.capitalize()}</p>
                <CardTitle>{this.props.value}</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default DataCard;
