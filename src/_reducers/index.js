import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    alert,
    authentication
  });

export default rootReducer;