import React, { Component } from "react";
import {
  Card,
  CardBody,
  Form,
  Button,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { createRecord, fetchRecords } from "../actions/recordActions";
import { connect } from "react-redux";
import { timeToIntegerMinutes } from "../conversions";

class AddRecordCard extends Component {
  state = {
    record_name: "",
    server_id: -1,
    interval: -1,
    visible: false,
    start_time: "",
    end_time: "",
    warning_message: "",
  };

  intervals = [
    "1 minutes",
    "15 minutes",
    "30 minutes",
    "1 hour",
    "3 hours",
    "10 hours",
    "24 hours",
  ];

  static propTypes = {
    createRecord: PropTypes.func.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    records: PropTypes.array.isRequired,
  };

  recordsNameExists(record_name) {
    if (record_name.trim().length === 0) {
      return false;
    }
    var recordsWithName = this.props.records.filter(function (record) {
      return record.name.trim().length === 0;
    });
    for (var i = 0; i < recordsWithName.length; i++) {
      if (recordsWithName[i] === record_name) {
        return true;
      }
    }
    return false;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      record_name,
      server_id,
      interval,
      start_time,
      end_time,
    } = this.state;
    if (this.recordsNameExists(record_name)) {
      this.setState({
        visible: true,
        message: "Record name already exists",
      });
    } else if (start_time >= end_time) {
      this.setState({
        visible: true,
        message: "Start time is after end time",
      });
    } else {
      const start_time = this.getCurrentFormattedDate();
      const end_time = "";
      //need to handle minutes to hours conversion
      const interval_in_minutes = timeToIntegerMinutes(interval);
      const report = {
        record_name,
        server_id,
        interval_in_minutes,
        start_time,
        end_time,
      };
      this.props.createRecord(report);
      this.setState({
        record_name: "",
        server_id: this.state.servers[0].id,
        interval: this.intervals[0],
        visible: false,
      });
    }
  };

  componentDidMount() {
    this.props.fetchRecords();
    axios.get(`http://localhost:8080/api/server/`).then((res) => {
      const servers = res.data;
      this.setState({
        record_name: "",
        server_id: servers[0].id,
        interval: this.intervals[0],
        servers: servers,
      });
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getCurrentFormattedDate() {
    let newDate = new Date();
    let month = newDate.getUTCMonth() + 1;
    let year = newDate.getUTCFullYear();
    let date = newDate.getUTCDate();
    let hours = newDate.getUTCHours();
    let minutes = newDate.getUTCMinutes();
    let dash = "-";
    return `${year}${dash}${
      month < 10 ? `0${month}` : `${month}`
    }${dash}${date} ${hours}:${minutes}`;
  }
  render() {
    const {
      record_name,
      interval,
      server_id,
      start_time,
      end_time,
    } = this.state;
    return (
      <Card>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <h4>Add a new Record</h4>
            <Input
              type="text"
              placeholder="Record Name Optional"
              name="record_name"
              onChange={this.onChange}
              value={record_name}
            />
            <div>
              <h5>Nearby Servers to test with</h5>
              <Input
                type="select"
                name="server_id"
                onChange={this.onChange}
                value={server_id}
              >
                {this.props.servers.map((item, index) => (
                  <option key={item.id} value={this.props.servers[index].id}>
                    {item.name + " at " + item.location}
                  </option>
                ))}
              </Input>
            </div>
            <div>
              <h5>Select a Time Range</h5>
              <p>Most accurate results when everyone's asleep</p>
              <Row>
                <Col>
                  <Input
                    type="time"
                    step="3600000"
                    name="start_time"
                    value={start_time}
                    onClick={(e) => e.preventDefault()}
                    onChange={this.onChange}
                  ></Input>
                </Col>
                <Col>
                  <h4> to </h4>
                </Col>
                <Col>
                  <Input
                    type="time"
                    name="end_time"
                    value={end_time}
                    onChange={this.onChange}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <h5>Select an Interval</h5>
              <Input
                type="select"
                name="interval"
                onChange={this.onChange}
                value={interval}
              >
                {this.intervals.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </Input>
            </div>
            <br />
            <Row>
              <Col>
                <Button type="submit">Add Record</Button>
              </Col>
              <Col>
                <Alert color="warning" isOpen={this.state.visible}>
                  {this.state.message}
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() =>
                      this.setState({
                        visible: false,
                      })
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </Button>
                </Alert>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.records.records,
});

export default connect(mapStateToProps, { createRecord, fetchRecords })(
  AddRecordCard
);
