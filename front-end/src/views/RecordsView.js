import React, { Component } from "react";
import AddRecordCard from "../components/AddRecordCard";
import AllRecordsCard from "../components/AllRecordsCard";
import { Row, Col } from "reactstrap";
import axios from "axios";
class RecordsView extends Component {
  state = {
    servers: [],
  };

  componentDidMount() {
    const URL = "http://" + process.env.REACT_APP_HOST_IP_ADDRESS + ":8080/api/server";

    axios.get(URL).then((res) => {
      const servers = res.data;
      this.setState({
        servers: servers,
      });
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <AddRecordCard servers={this.state.servers} />
          </Col>
          <Col>
            <AllRecordsCard servers={this.state.servers} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecordsView;
