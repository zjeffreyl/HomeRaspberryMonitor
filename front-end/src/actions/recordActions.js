import { FETCH_RECORDS, NEW_RECORD, DELETE_RECORD } from "./types";
import axios from "axios";

const URL = "http://" + process.env.REACT_APP_HOST_IP_ADDRESS + ":8080/api/reportRecord";

export const fetchRecords = () => (dispatch) => {
  console.log(URL);
  axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: FETCH_RECORDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createRecord = (recordData) => (dispatch) => {
  axios
    .post(URL, recordData)
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
    .delete(`${URL}/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_RECORD,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
