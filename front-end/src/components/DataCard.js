import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

const DataCard = () => {
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
              <p>Revenue</p>
              <CardTitle>$ Value</CardTitle>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DataCard;
