import { FETCH_SERVER_REPORTS, DELETE_SERVER_REPORTS } from "./types";
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
