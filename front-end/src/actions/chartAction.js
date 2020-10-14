import axios from "axios";
import { FETCH_DATA_FROM_START_END, SET_CHART_TO_DOWNLOAD, SET_CHART_TO_PING, SET_CHART_TO_UPLOAD } from "../actions/types";

export const fetchDataFromStartToEnd = (startDate, endDate) => (dispatch) => {
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      dispatch({
        type: FETCH_DATA_FROM_START_END,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const setChartToPing = (startDate, endDate) => (dispatch) => {
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      dispatch({
        type: SET_CHART_TO_PING,
        payload: res.data[0],
      });
    })
    .catch((err) => console.log(err));
}

export const setChartToDownload = (startDate, endDate) => (dispatch) => {
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      dispatch({
        type: SET_CHART_TO_DOWNLOAD,
        payload: res.data[1],
      });
    })
    .catch((err) => console.log(err));
}

export const setChartToUpload = (startDate, endDate) => (dispatch) => {
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      dispatch({
        type: SET_CHART_TO_UPLOAD,
        payload: res.data[2],
      });
    })
    .catch((err) => console.log(err));
}
