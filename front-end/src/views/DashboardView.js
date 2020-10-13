import React, { useState } from "react";
import {
  Row,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import DashboardCards from "../components/DashboardCards";
import DashboardContent from "../components/DashboardContent";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [{"name": [1, 2, 3]}, [2,3,4]]
    }]
  }

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
            24 Hours
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            1 week
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            1 month
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <DashboardContent />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col>
              <h2>Tab 3 Contents</h2>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

// class DashboardView extends Component {
//   render() {
//     return (
//       <div>

//         <DashboardCards />
//         <Row>
//           <Col>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Record Averages from the last N times</CardTitle>
//                 <Row>
//                   <Col>
//                     <p>Last 24 hours</p>
//                   </Col>
//                 </Row>
//                 <CardBody>
//                   <Line
//                     data={dashboard24HoursPerformanceChart.data}
//                     options={dashboard24HoursPerformanceChart.options}
//                     width={400}
//                     height={100}
//                   />
//                 </CardBody>
//               </CardHeader>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// export default DashboardView;
