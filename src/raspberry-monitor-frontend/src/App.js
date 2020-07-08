import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    isLoading: false,
    serverReports: [],
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:8080/api/serverReports/");
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
  }

  render() {
    const { serverReports, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
            {serverReports.map((serverReport) => (
              <div key={serverReport.ping}>{serverReport.ping}</div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
