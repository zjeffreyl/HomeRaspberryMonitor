import RecordsView from "./views/RecordsView";
import DashboardView from "./views/DashboardView";

var routes = [
  {
    path: "/records",
    name: "Records",
    component: RecordsView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
  },
];

export default routes;
