import React from "react";
import SideBar from "./functions/SideBar";
import "./css/App.css";
import { Col, Row } from "reactstrap";
import routes from "./routes";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App(props) {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Row>
            <Col>
              <SideBar {...props} routes={routes} />
            </Col>
            <Col>
              <Switch>
                {routes.map((prop, index) => {
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
      </Provider>
    </div>
  );
}

export default App;
