import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import DashboardCards from "./DashboardCards";

export default class DashboardContent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <DashboardCards />
          </Col>
        </Row>
        {/* <Row>
               <Col>
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
//         </Row> */}
      </div>
    );
  }
}
