import React, { Component } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchServerReports } from "../actions/serverReportActions";

export class DataCard extends Component {
  static propTypes = {
    fetchServerReports: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchServerReports();
  }

  render() {
    return (
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
                <p>Revenue</p>
                <CardTitle>$ Value</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  serverReports: state.serverReports.serverReports,
});

export default connect(mapStateToProps, {
  fetchServerReports,
})(DataCard);
