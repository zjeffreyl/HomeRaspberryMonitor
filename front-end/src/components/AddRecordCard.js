import React, { Component } from 'react';
import {Card, CardBody, Form, Button, Input} from 'reactstrap';
import Example from '../functions/Dropdown';
class AddRecordCard extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dropDownValue : "Select interval",
            dropDownOpen : false
        }
    }

    toggle(e) {
        this.setState({
            dropdownOpen: !this.state.dropDownOpen
        });
    }

    onChange(e) {
        this.setState({
            dropDownValue: e.currentTarget.textContent
        });
    }

    render() {
        const intervals = ["15 minutes", "30 minutes", "1 hour", "3 hours", "10 hours", "24 hours"];
        return (
            <Card>
                <CardBody>
                    <Form>
                        <h5>
                            Add a new Record
                        </h5>
                        <Input type = "text" placeholder = "Record Name Optional"/>
                        <div>
                            <h6>Select an Interval</h6>
                            <Example intervals={intervals}/>
                        </div>
                        <br/>
                        <Button>Add Record</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default AddRecordCard;
