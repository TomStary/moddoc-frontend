import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { profile } from './profile.reducer';

export default (history) => combineReducers({
  alert,
  authentication,
  registration,
  profile,
  router: connectRouter(history)
});