import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    isLoading: true,
    serverReports: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/serverReports")
      .then((response) => response.json())
      .then((data) => this.setState({ serverReports: data, isLoading: false }));
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
              <div key={serverReport.id}>{serverReport.download}</div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
