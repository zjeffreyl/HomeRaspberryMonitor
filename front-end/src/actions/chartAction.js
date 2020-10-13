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

export const setChartToPing = () => (dispatch) => {
  dispatch({
    type: SET_CHART_TO_PING,
  });
}

export const setChartToDownload = () => (dispatch) => {
  dispatch({
    type: SET_CHART_TO_DOWNLOAD,
  })
}

export const setChartToUpload = () => (dispatch) => {
  dispatch({
    type: SET_CHART_TO_UPLOAD,
  })
}
