import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Table,
  CardBody,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { fetchRecords, deleteRecord } from "../actions/recordActions";
import { connect } from "react-redux";

export class AllRecordsCard extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired,
    servers: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchRecords();
  }

  componentDidUpdate() {
    this.props.fetchRecords();
  }

  convertMinutesToString(minutes) {
    var hourInMinutes = 60;
    var hours = minutes / hourInMinutes;
    if (hours >= 1) {
      return hours + " hours";
    } else {
      return minutes + " minutes";
    }
  }

  getServerNameFromId(id) {
    console.log(id);
    console.log(this.props.servers);
    for (var i = 0; i < this.props.servers.length; i++) {
      if (id === this.props.servers[i].id) {
        return this.props.servers[i].name;
      }
    }
  }

  render() {
    return (
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
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.records.map((record, index) => (
                <tr key={index}>
                  <td>{record.id}</td>
                  <td>{record.record_name}</td>
                  <td>{this.getServerNameFromId(record.server_id)}</td>
                  <td>
                    {this.convertMinutesToString(record.interval_in_minutes)}
                  </td>
                  <td>{record.start_time}</td>
                  <td>
                    <Button
                      onClick={this.props.deleteRecord.bind(this, record.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.records.records,
});

export default connect(mapStateToProps, {
  fetchRecords,
  deleteRecord,
})(AllRecordsCard);
