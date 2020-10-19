import axios from "axios";
import {
  FETCH_DATA_FROM_START_END, SET_CHART1_TO_DOWNLOAD, SET_CHART1_TO_PING, SET_CHART1_TO_UPLOAD,
  SET_CHART2_TO_PING, SET_CHART2_TO_DOWNLOAD, SET_CHART2_TO_UPLOAD, SET_CHART3_TO_PING, SET_CHART3_TO_DOWNLOAD, SET_CHART3_TO_UPLOAD
} from "../actions/types";
import { LocalDateToUTC } from "../utilities/conversions"
import { tabIdToDays } from "../utilities/constants";

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

export const setChartToPing = (id) => (dispatch) => {
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * tabIdToDays(id) * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: SET_CHART1_TO_PING,
            payload: res.data[0],
          });
          break;
        case 2:
          dispatch({
            type: SET_CHART2_TO_PING,
            payload: res.data[0],
          });
          break;
        case 3:
          dispatch({
            type: SET_CHART3_TO_PING,
            payload: res.data[0],
          });
          break;
        default:
          console.error("Chart Id not recognized in chartAction ping");
          return;
      }

    })
    .catch((err) => console.log(err));
}

export const setChartToDownload = (id) => (dispatch) => {
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * tabIdToDays(id) * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: SET_CHART1_TO_DOWNLOAD,
            payload: res.data[1],
          });
          break;
        case 2:
          dispatch({
            type: SET_CHART2_TO_DOWNLOAD,
            payload: res.data[1],
          });
          break;
        case 3:
          dispatch({
            type: SET_CHART3_TO_DOWNLOAD,
            payload: res.data[1],
          });
          break;
        default:
          console.error("Chart Id not recognized in chartAction download")
          return;
      }
    })
    .catch((err) => console.log(err));
}

export const setChartToUpload = (id) => (dispatch) => {
  var endDate = LocalDateToUTC(new Date());
  var startDate = LocalDateToUTC(new Date(Date.now() - 86400 * tabIdToDays(id) * 1000));
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}/`
    )
    .then((res) => {
      switch (id) {
        case 1:
          dispatch({
            type: SET_CHART1_TO_UPLOAD,
            payload: res.data[2],
          });
          break;
        case 2:
          dispatch({
            type: SET_CHART2_TO_UPLOAD,
            payload: res.data[2],
          });
          break;
        case 3:
          dispatch({
            type: SET_CHART3_TO_UPLOAD,
            payload: res.data[2],
          });
          break;
        default:
          console.error("Chart Id not recognized in chartAction upload");
          return;
      }
    })
    .catch((err) => console.log(err));
}