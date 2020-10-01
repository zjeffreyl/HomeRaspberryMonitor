import React, { Component } from "react";
import DataCard from "../components/DataCard";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { fetchRecords } from "../actions/recordActions";
import {
  fetchServerReports,
  fetchRecentData,
  fetchHistoryData,
  fetchLatestReportTimestamp,
} from "../actions/serverReportActions";
import { connect } from "react-redux";

class DashboardCards extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    serverReports: PropTypes.array.isRequired,
    fetchServerReports: PropTypes.func.isRequired,
    fetchRecentData: PropTypes.func.isRequired,
    recentData: PropTypes.array.isRequired,
    fetchHistoryData: PropTypes.func.isRequired,
    historyData: PropTypes.array.isRequired,
    fetchLatestReportTimestamp: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchRecords();
    this.props.fetchServerReports();
    this.props.fetchRecentData();
    this.props.fetchHistoryData();
    this.props.fetchLatestReportTimestamp();
  }

  render() {
    return (
      <Row>
        <DataCard
          type="ping"
          recentData={this.props.recentData[0]}
          historyData={this.props.historyData[0]}
          latestReportTimestamp={this.props.latestReportTimestamp}
        />
        <DataCard
          type="download"
          recentData={this.props.recentData[1]}
          historyData={this.props.historyData[1]}
          latestReportTimestamp={this.props.latestReportTimestamp}
        />
        <DataCard
          type="upload"
          recentData={this.props.recentData[2]}
          historyData={this.props.historyData[2]}
          latestReportTimestamp={this.props.latestReportTimestamp}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.records.records,
  serverReports: state.serverReports.serverReports,
  recentData: state.serverReports.recentData,
  historyData: state.serverReports.historyData,
  latestReportTimestamp: state.serverReports.latestReportTimestamp,
});

export default connect(mapStateToProps, {
  fetchRecords,
  fetchServerReports,
  fetchRecentData,
  fetchHistoryData,
  fetchLatestReportTimestamp,
})(DashboardCards);
