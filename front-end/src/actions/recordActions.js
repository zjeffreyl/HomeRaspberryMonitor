import { FETCH_RECORDS, NEW_RECORD, DELETE_RECORD } from "./types";
import axios from "axios";

export const fetchRecords = () => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/reportRecord`)
    .then((res) => {
      dispatch({
        type: FETCH_RECORDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createRecord = (recordData) => (dispatch) => {
  console.log(recordData);
  axios
    .post(`http://localhost:8080/api/reportRecord`, recordData)
    .then((res) => {
      dispatch({
        type: NEW_RECORD,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteRecord = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/api/reportRecord/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_RECORD,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
