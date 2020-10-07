import { formatDateToPathString } from "../formats";
import axios from "axios";
import { FETCH_DATA_FROM_START_END } from "../actions/types";

export const fetchDataFromStartToEnd = (startDate, endDate) => (dispatch) => {
  startDate = startDate.replace("T", " ");
  startDate = startDate.split(".")[0];
  endDate = endDate.replace("T", " ");
  endDate = endDate.split(".")[0];
  console.log(startDate);
  console.log(endDate);
  axios
    .get(
      `http://localhost:8080/api/serverReport/timeRange/startDate=${startDate}endDate=${endDate}`
    )
    .then((res) => {
      dispatch({
        type: FETCH_DATA_FROM_START_END,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
