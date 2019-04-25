import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { profile } from './profile.reducer';
import { repositories } from './repositories.reducer';
import { repository } from './repository.reducer';
import { modules } from './modules.reducer';

export default (history) => combineReducers({
  alert,
  authentication,
  registration,
  profile,
  repositories,
  repository,
  modules,
  router: connectRouter(history)
});