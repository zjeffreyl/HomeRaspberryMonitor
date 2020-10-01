import {
  FETCH_SERVER_REPORTS,
  DELETE_SERVER_REPORTS,
  FETCH_RECENT_DATA,
  FETCH_HISTORY_DATA,
  FETCH_LATEST_REPORT_TIMESTAMP,
} from "./types";
import axios from "axios";

export const fetchServerReports = () => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/serverReport`)
    .then((res) => {
      dispatch({
        type: FETCH_SERVER_REPORTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteServerReports = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete(`http://localhost:8080/api/serverReport/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_SERVER_REPORTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchRecentData = () => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/serverReport/recentData`)
    .then((res) => {
      dispatch({
        type: FETCH_RECENT_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchHistoryData = () => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/serverReport/historyData`)
    .then((res) => {
      dispatch({
        type: FETCH_HISTORY_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchLatestReportTimestamp = () => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/serverReport/lastRecordedDate`)
    .then((res) => {
      dispatch({
        type: FETCH_LATEST_REPORT_TIMESTAMP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
