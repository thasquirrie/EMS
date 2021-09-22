// import {
//   LOGIN_USER,
//   LOGIN_SUCCESS,
//   LOGOUT_USER,
//   LOGOUT_USER_SUCCESS,
//   API_ERROR,
// } from "./actionTypes"

// const initialState = {
//   error: "",
//   loading: false,
// }

// const login = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_USER:
//       state = {
//         ...state,
//         loading: true,
//       }
//       break
//     case LOGIN_SUCCESS:
//       state = {
//         ...state,
//         loading: false,
//       }
//       break
//     case LOGOUT_USER:
//       state = { ...state }
//       break
//     case LOGOUT_USER_SUCCESS:
//       state = { ...state }
//       break
//     case API_ERROR:
//       state = { ...state, error: action.payload, loading: false }
//       break
//     default:
//       state = { ...state }
//       break
//   }
//   return state
// }

// export default login

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './actionTypes';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// export default userLoginReducer;
