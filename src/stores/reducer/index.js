import {combineReducers} from 'redux';

import counter from './counter';
import user from './user';
import booking from './booking';
import auth from './auth';

export default combineReducers({
  counter,
  user,
  booking,
  auth,
});
