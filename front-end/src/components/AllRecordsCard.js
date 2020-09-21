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
import { deleteServerReports } from "../actions/serverReportActions";
import { fetchRecords, deleteRecord } from "../actions/recordActions";
import { connect } from "react-redux";
import { minutesToString, UTCDefaultToLocalTimeZone } from "../conversions";

export class AllRecordsCard extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired,
    deleteServerReports: PropTypes.func.isRequired,
    servers: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchRecords();
  }

  getServerNameFromId(id) {
    for (var i = 0; i < this.props.servers.length; i++) {
      if (id === this.props.servers[i].id) {
        return this.props.servers[i].name;
      }
    }
  }

  onDelete = (record_id) => {
    this.props.deleteRecord(record_id);
    this.props.deleteServerReports(record_id);
  };

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
                  <td>{minutesToString(record.interval_in_minutes)}</td>
                  <td>{UTCDefaultToLocalTimeZone(record.start_time)}</td>
                  <td>
                    <Button onClick={this.onDelete.bind(this, record.id)}>
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
  deleteServerReports,
})(AllRecordsCard);
