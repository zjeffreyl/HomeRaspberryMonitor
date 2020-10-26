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
} from "./types";
import axios from "axios";
import { LocalDateToUTC } from "../utilities/conversions";
import { tabIdToDays } from "../utilities/constants";

const URL = "http://" + process.env.REACT_APP_HOST_IP_ADDRESS + ":8080/api/serverReport";

export const fetchServerReports = () => (dispatch) => {
  axios
    .get(URL)
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
    .delete(`${URL}/${id}`)
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
    .get(`${URL}/recentData`)
    .then((res) => {
      dispatch({
        type: FETCH_RECENT_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchAveragePing = (id) => (dispatch) => {
  var days = tabIdToDays(id);
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * days * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(`${URL}/historyData/ping/startDate=${startDate}endDate=${endDate}`)
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: FETCH_AVERAGE_PING_1,
            payload: res.data
          });
          break;
        case 2:
          dispatch({
            type: FETCH_AVERAGE_PING_2,
            payload: res.data
          });
          break;
        case 3:
          dispatch({
            type: FETCH_AVERAGE_PING_3,
            payload: res.data
          });
          break;
        default:
          console.error("Fetch Ping Id not found");
          break;
      }
    })
    .catch((err) => console.log(err));
};

export const fetchAverageDownload = (id) => (dispatch) => {
  var days = tabIdToDays(id);
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * days * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(`${URL}/historyData/download/startDate=${startDate}endDate=${endDate}`)
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: FETCH_AVERAGE_DOWNLOAD_1,
            payload: res.data
          });
          break;
        case 2:
          dispatch({
            type: FETCH_AVERAGE_DOWNLOAD_2,
            payload: res.data
          });
          break;
        case 3:
          dispatch({
            type: FETCH_AVERAGE_DOWNLOAD_3,
            payload: res.data
          });
          break;
        default:
          console.error("Fetch Ping Id not found");
          break;
      }
    })
    .catch((err) => console.log(err));
};

export const fetchAverageUpload = (id) => (dispatch) => {
  var days = tabIdToDays(id);
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * days * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(`${URL}/historyData/upload/startDate=${startDate}endDate=${endDate}`)
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: FETCH_AVERAGE_UPLOAD_1,
            payload: res.data
          });
          break;
        case 2:
          dispatch({
            type: FETCH_AVERAGE_UPLOAD_2,
            payload: res.data
          });
          break;
        case 3:
          dispatch({
            type: FETCH_AVERAGE_UPLOAD_3,
            payload: res.data
          });
          break;
        default:
          console.error("Fetch Ping Id not found");
          break;
      }
    })
    .catch((err) => console.log(err));
};

export const fetchLatestReportTimestamp = () => (dispatch) => {
  axios
    .get(`${URL}/lastRecordedDate`)
    .then((res) => {
      dispatch({
        type: FETCH_LATEST_REPORT_TIMESTAMP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
