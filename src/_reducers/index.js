import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

export default (history) => combineReducers({
  alert,
  authentication,
  registration,
  router: connectRouter(history)
});