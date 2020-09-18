import React, { Component } from "react";
import AddRecordCard from "../components/AddRecordCard";
import AllRecordsCard from "../components/AllRecordsCard";
import {Row, Col} from "reactstrap";
class RecordsView extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <AddRecordCard />
          </Col>
          <Col>
            <AllRecordsCard/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecordsView;
