import {
  FETCH_SERVER_REPORTS,
  DELETE_SERVER_REPORTS,
  FETCH_RECENT_DATA,
  FETCH_LATEST_REPORT_TIMESTAMP,
  FETCH_AVERAGE_PING_1,
  FETCH_AVERAGE_PING_2,
  FETCH_AVERAGE_PING_3,
  FETCH_AVERAGE_DOWNLOAD_1,
  FETCH_AVERAGE_DOWNLOAD_2,
  FETCH_AVERAGE_DOWNLOAD_3,
  FETCH_AVERAGE_UPLOAD_1,
  FETCH_AVERAGE_UPLOAD_2,
  FETCH_AVERAGE_UPLOAD_3
} from "../actions/types";

const initialState = {
  serverReports: [],
  historyData: {
    1: {
      ping: null,
      download: null,
      upload: null,
    },
    2: {
      ping: null,
      download: null,
      upload: null,
    },
    3: {
      ping: null,
      download: null,
      upload: null,
    },
  },
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
    case FETCH_AVERAGE_PING_1:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          1: {
            ...state.historyData[1],
            ping: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_PING_2:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          2: {
            ...state.historyData[2],
            ping: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_PING_3:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          3: {
            ...state.historyData[3],
            ping: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_DOWNLOAD_1:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          1: {
            ...state.historyData[1],
            download: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_DOWNLOAD_2:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          2: {
            ...state.historyData[2],
            download: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_DOWNLOAD_3:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          3: {
            ...state.historyData[3],
            download: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_UPLOAD_1:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          1: {
            ...state.historyData[1],
            upload: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_UPLOAD_2:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          2: {
            ...state.historyData[2],
            upload: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_AVERAGE_UPLOAD_3:
      return {
        ...state,
        historyData: {
          ...state.historyData,
          3: {
            ...state.historyData[3],
            upload: action.payload === "" ? null : action.payload,
          }
        }
      };
    case FETCH_LATEST_REPORT_TIMESTAMP:
      return {
        ...state,
        latestReportTimestamp: action.payload,
      };
    //TODO: Set the labels
    default:
      return state;
  }
}
