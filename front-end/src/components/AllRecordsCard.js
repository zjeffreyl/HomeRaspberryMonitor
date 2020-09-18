import React, {Component} from 'react';
import {Card, CardHeader, CardTitle, Table, CardBody, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {fetchRecords, deleteRecord} from "../actions/recordActions";
import {connect} from 'react-redux';

export class AllRecordsCard extends Component {
    static propTypes = {
        records: PropTypes.array.isRequired,
        fetchRecords: PropTypes.func.isRequired,
        deleteRecord: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchRecords();
    }

    render()
    {
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
                          <th/>
                        </tr>
                      </thead>
                      <tbody>
                          {this.props.records.map((record) => (
                            <tr key = {record.id}>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td><Button onClick={this.props.deleteRecord.bind(this, record.id)}>Delete</Button></td>
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

export default connect(mapStateToProps, {fetchRecords, deleteRecord})(AllRecordsCard);
