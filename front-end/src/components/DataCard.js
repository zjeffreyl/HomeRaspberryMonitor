import React, { Component } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export class DataCard extends Component {
  constructor(props) {
    super(props);
  }

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
