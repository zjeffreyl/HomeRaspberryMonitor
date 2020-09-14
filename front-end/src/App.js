import React from "react";
import SideBar from "./functions/SideBar";
import "./css/App.css";
import { Col, Row } from "reactstrap";
import routes from "./routes";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Row>
          <Col>
            <SideBar {...props} routes={routes} />
          </Col>
          <Col>
            <Switch>
              {routes.map((prop, index) => {
                console.log(prop);
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={index}
                  />
                );
              })}
            </Switch>
          </Col>
        </Row>
      </BrowserRouter>
    </div>
  );
}

export default App;
