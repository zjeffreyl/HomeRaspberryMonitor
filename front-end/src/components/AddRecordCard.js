import React, { Component } from "react";
import { Card, CardBody, Form, Button, Input } from "reactstrap";
import axios from 'axios';
import PropTypes from "prop-types";
import {createRecord} from "../actions/recordActions";
import {connect} from "react-redux";

class AddRecordCard extends Component {

  state = {
    record_name: "",
    server_id: -1,
    interval: -1,
    servers: []
  };

  static propTypes = {
    createRecord: PropTypes.func.isRequired,
  };

  intervals = [
    "15 minutes",
    "30 minutes",
    "1 hour",
    "3 hours",
    "10 hours",
    "24 hours",
  ];

  onSubmit = (e) => {
    e.preventDefault();
    const { record_name, id, interval} = this.state;
    const start_time = this.getCurrentFormattedDate();
    const end_time = "";
    const interval_in_minutes = parseInt(interval.split(" ")[0])
    const report = {record_name, id, interval_in_minutes, start_time, end_time}
    this.props.createRecord(report);
    this.setState({
      record_name: '',
      server_id: this.state.servers[0].id,
      interval: this.intervals[0],
    });
  }

  getCurrentFormattedDate() {
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let date = newDate.getDate();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let milliseonds = newDate.getMilliseconds();
    let dash = '-';
    return `${year}${dash}${month<10?`0${month}`:`${month}`}${dash}${date} ${hours}:${minutes}:${seconds}.${milliseonds}`
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/api/server/`).then(res => {
      const servers = res.data;
      this.setState({
        record_name: '',
        server_id: servers[0].id,
        interval: this.intervals[0],
        servers: servers
      });
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { record_name, interval, server_id, servers} = this.state;
    return (
      <Card>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <h5>Add a new Record</h5>
            <Input type="text" placeholder="Record Name Optional" name="record_name" onChange={this.onChange} value={record_name}/>
            <div>
              <h6>Nearby Servers to test with</h6>
              <Input type="select" name="server_id" onChange={this.onChange} value={server_id}>
                  {servers.map((item) => (
                    <option key={item.id}>{item.name + " at " + item.location}</option>
                  ))}
              </Input>
            </div>
            <div>
              <h6>Select an Interval</h6>
              <Input type="select" name="interval" onChange={this.onChange} value={interval}>
                  {this.intervals.map((item, index) =>
                    <option key={index}>{item}</option>
                  )}
              </Input>
            </div>
            <br />
            <Button type="submit">Add Record</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(null, {createRecord})(AddRecordCard);
