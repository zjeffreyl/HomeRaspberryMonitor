import React, { Component } from "react";
import { Card, CardBody, Form, Button, Input } from "reactstrap";
import CustomDropdown from "../functions/CustomDropdown";
import axios from 'axios';

class AddRecordCard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      dropDownValue: "Select interval",
      dropDownOpen: false,
      servers: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/api/server/").then(res => {
      const servers = res.data;
      this.setState({servers: servers});
    })
    console.log(this.state.servers)
  }

  toggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropDownOpen,
    });
  }

  onChange(e) {
    this.setState({
      dropDownValue: e.currentTarget.textContent,
    });
  }

  render() {
    const intervals = [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "3 hours",
      "10 hours",
      "24 hours",
    ];
    return (
      <Card>
        <CardBody>
          <Form>
            <h5>Add a new Record</h5>
            <Input type="text" placeholder="Record Name Optional" />
            <div>
              <h6>Nearby Servers to test with</h6>
              <CustomDropdown list={intervals} />
            </div>
            <div>
              <h6>Select an Interval</h6>
              <CustomDropdown list={intervals} />
            </div>
            <br />
            <Button>Add Record</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default AddRecordCard;
