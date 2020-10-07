import { combineReducers } from "redux";
import chartReducer from "./chartReducer";
import recordsReducer from "./recordsReducer";
import serverReportReducer from "./serverReportsReducer";

export default combineReducers({
  records: recordsReducer,
  serverReports: serverReportReducer,
  chart: chartReducer,
});
