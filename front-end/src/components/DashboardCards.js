import React, { Component } from "react";
import DataCard from "../components/DataCard";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { fetchRecords } from "../actions/recordActions";
import { fetchServerReports } from "../actions/serverReportActions";
import { connect } from "react-redux";
import axios from "axios";

export class DashboardCards extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    serverReports: PropTypes.array.isRequired,
    fetchServerReports: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchRecords();
    this.props.fetchServerReports();
  }

  //calculate the average of the most recent serverReports for each record
  getAverageOfMostRecent() {
    var sum_ping = 0;
    var sum_download = 0;
    var sum_upload = 0;
    var record_ids = this.props.records.map((record) => record.id);
    for (var i = 0; i < record_ids.length; i++) {
      for (var j = 0; j < this.props.serverReports.length; j++) {
        if (record_ids[i] === this.props.serverReports[j].report_record_id) {
          //get the first one
          sum_ping += this.props.serverReports[j].ping;
          sum_download += this.props.serverReports[j].download;
          sum_upload += this.props.serverReports[j].upload;
          break;
        }
      }
    }
  }

  render() {
    this.getAverageOfMostRecent();
    return (
      <div></div>
      //   <Row>
      //     <DataCard type="ping" value={ping} />
      //     <DataCard type="download" value={download} />
      //     <DataCard type="upload" value={upload} />
      //   </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.records.records,
  serverReports: state.serverReports.serverReports,
});

export default connect(mapStateToProps, {
  fetchRecords,
  fetchServerReports,
})(DashboardCards);
