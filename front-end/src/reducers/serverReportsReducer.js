import {
  FETCH_SERVER_REPORTS,
  DELETE_SERVER_REPORTS,
  FETCH_RECENT_DATA,
  FETCH_HISTORY_DATA,
  FETCH_LATEST_REPORT_TIMESTAMP,
} from "../actions/types";

const initialState = {
  serverReports: [],
  recentData: [],
  historyData: [],
  latestReportTimestamp: -1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVER_REPORTS:
      return {
        ...state,
        serverReports: action.payload,
      };
    case DELETE_SERVER_REPORTS:
      return {
        ...state,
        serverReports: state.serverReports.filter(
          (serverReport) => serverReport.id !== action.payload.id
        ),
      };
    case FETCH_RECENT_DATA:
      return {
        ...state,
        recentData: action.payload,
      };
    case FETCH_HISTORY_DATA:
      return {
        ...state,
        historyData: action.payload,
      };
    case FETCH_LATEST_REPORT_TIMESTAMP:
      return {
        ...state,
        latestReportTimestamp: action.payload,
      };
    default:
      return state;
  }
}
