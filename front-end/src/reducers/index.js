import { combineReducers } from 'redux';
import recordsReducer from './recordsReducer';

export default combineReducers({
  records: recordsReducer
});