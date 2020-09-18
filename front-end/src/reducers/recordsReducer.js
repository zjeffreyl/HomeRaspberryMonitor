import { FETCH_RECORDS, NEW_RECORD } from "../actions/types";

const initialState = {
  records: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    case NEW_RECORD:
      return {
        ...state,
        records: [...state.records],
      };
    default:
      return state;
  }
}
