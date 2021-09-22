import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from ''

// Front
import Layout from './layout/reducer';

// Authentication
// import Login from './auth/login/reducer';
import Account from './auth/register/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';
import Profile from './auth/profile/reducer';

//Calendar
import calendar from './calendar/reducer';

//chat
import chat from './chat/reducer';

//contacts
import contacts from './contacts/reducer';

//tasks
import tasks from './tasks/reducer';

import {
  addUserReducer,
  userDetailsReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
} from '../reducers/userReducers';
import {
  addEnrolleeReducer,
  editEnrolleeReducer,
  enrolleeDetailsReducer,
  enrolleeListReducer,
} from '../reducers/enrolleeReducers';
import {
  addCenterReducer,
  centerListReducer,
} from '../reducers/centerReducers';

const rootReducer = combineReducers({
  // public
  Layout,
  // Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  tasks,
  contacts,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userAdd: addUserReducer,
  userDetails: userDetailsReducer,
  userEdit: userEditReducer,
  addEnrollee: addEnrolleeReducer,
  enrolleeList: enrolleeListReducer,
  enrolleeDetails: enrolleeDetailsReducer,
  enrolleeEdit: editEnrolleeReducer,
  addCenter: addCenterReducer,
  centerList: centerListReducer,
});

export const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export default rootReducer;
