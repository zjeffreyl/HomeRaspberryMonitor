import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  CardTitle,
  Nav,
  NavItem,
  TabPane,
  TabContent,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { formatDate } from "../formats";

export default function DataCard(props) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Recent
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            All Time
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CardContent
            type={props.type}
            value={props.recentData}
            footer={"Last updated: " + formatDate(props.latestReportTimestamp)}
          />
        </TabPane>
        <TabPane tabId="2">
          <CardContent
            type={props.type}
            value={props.historyData}
            footer="Since first report"
          />
        </TabPane>
      </TabContent>
    </div>
  );
}

const CardContent = (props) => (
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
            <p>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</p>
            <CardTitle>{props.value}</CardTitle>
          </div>
        </Col>
      </Row>
    </CardBody>
    <CardFooter>
      <div>
        <i />
        {props.footer}
      </div>
    </CardFooter>
  </Card>
);
