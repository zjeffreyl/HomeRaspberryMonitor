import { FETCH_SERVER_REPORTS, DELETE_SERVER_REPORTS } from "../actions/types";

const initialState = {
  serverReports: [],
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
    default:
      return state;
  }
}
