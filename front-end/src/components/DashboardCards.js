import React, { Component } from "react";
import { Row, Card, CardBody, Col, CardTitle } from "reactstrap";
import PropTypes from "prop-types";
import {
  fetchAveragePing,
  fetchAverageDownload,
  fetchAverageUpload
} from "../actions/serverReportActions";
import { connect } from "react-redux";

class DashboardCards extends Component {
  static propTypes = {
    fetchAveragePing: PropTypes.func.isRequired,
    fetchAverageDownload: PropTypes.func.isRequired,
    fetchAverageUpload: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchAveragePing(this.props.id);
    this.props.fetchAverageDownload(this.props.id);
    this.props.fetchAverageUpload(this.props.id);
  }

  render() {
    return (
      <Row>
        <CardContent
          type="ping"
          value={this.props.ping}
        />
        <CardContent
          type="download"
          value={this.props.download}
        />
        <CardContent
          type="upload"
          value={this.props.upload}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ping: state.serverReports.historyData[props.id].ping,
  download: state.serverReports.historyData[props.id].download,
  upload: state.serverReports.historyData[props.id].upload
});

const CardContent = (props) => (
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
            <p>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</p>
            <CardTitle>{props.value === null ? "No Data" : props.type === "ping" ? props.value + " ms" : props.value + " Mbps"}</CardTitle>
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>
);



export default connect(mapStateToProps, {
  fetchAveragePing, fetchAverageDownload, fetchAverageUpload
})(DashboardCards);
