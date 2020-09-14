import React, { Component } from "react";
import AddRecordCard from "../components/AddRecordCard";
import {
  Row,
  Col,
  Table,
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
class RecordsView extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <AddRecordCard />
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Records</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Record Id</th>
                      <th>Record Name</th>
                      <th>Server Name</th>
                      <th>Interval</th>
                      <th>Time Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>
                      <Button>Delete</Button>
                    </td>
                  </tbody>
                  <tbody>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>
                      <Button>Delete</Button>
                    </td>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecordsView;
