import RecordsView from "./views/RecordsView";
import DashboardViewConnect from "./views/DashboardView";

var routes = [
  {
    path: "/records",
    name: "Records",
    component: RecordsView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardViewConnect,
  },
];

export default routes;
