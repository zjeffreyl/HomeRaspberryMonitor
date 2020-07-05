import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

interface ServerReport {
  id: number;
  download: number;
}

interface AppProps {}

interface IAppState {
  serverReports: Array<ServerReport>;
  isLoading: boolean;
}

class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      serverReports: [],
      isLoading: false,
    };
  }

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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <h2>Beer List</h2>
          {serverReports.map((serverReport: ServerReport) => (
            <div>{serverReport.download}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
