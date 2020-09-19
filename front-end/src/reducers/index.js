import { combineReducers } from "redux";
import recordsReducer from "./recordsReducer";
import serverReportReducer from "./serverReportsReducer";

export default combineReducers({
  records: recordsReducer,
  serverReports: serverReportReducer,
});
