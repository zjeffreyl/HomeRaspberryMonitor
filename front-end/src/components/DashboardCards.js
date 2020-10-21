import React, { Component } from "react";
import { Row, Card, CardBody, Col, Container } from "reactstrap";
import PropTypes from "prop-types";
import {
  fetchAveragePing,
  fetchAverageDownload,
  fetchAverageUpload
} from "../actions/serverReportActions";
import { connect } from "react-redux";
import pingIcon from "../assets/ping.png";
import downloadIcon from "../assets/download.png";
import uploadIcon from "../assets/upload.png";
import "../App.css";

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
          image={pingIcon}
        />
        <CardContent
          type="download"
          value={this.props.download}
          image={downloadIcon}
        />
        <CardContent
          type="upload"
          value={this.props.upload}
          image={uploadIcon}
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

const CardContent = (props) => {
  return (
    <Card className="dataCard" >
      <CardBody>
        <Container>
          <Row>
            <Col className="iconCol">
              <img src={props.image} alt="" />
            </Col>
            <Col>
              <div>
                <p className="dataTitle">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</p>
                <div className="dataValue">{props.value === null ? "No Data" : props.value}
                  <span className="dataUnit">{props.value == null ? "" : props.type === "ping" ? " ms" : " Mbps"}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>);
};



export default connect(mapStateToProps, {
  fetchAveragePing, fetchAverageDownload, fetchAverageUpload
})(DashboardCards);
