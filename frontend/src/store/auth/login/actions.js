// import {
//   LOGIN_USER,
//   LOGIN_SUCCESS,
//   LOGOUT_USER,
//   LOGOUT_USER_SUCCESS,
//   API_ERROR,
//   SOCIAL_LOGIN,
// } from "./actionTypes"

// export const loginUser = (user, history) => {
//   return {
//     type: LOGIN_USER,
//     payload: { user, history },
//   }
// }

// export const loginSuccess = user => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: user,
//   }
// }

// export const logoutUser = history => {
//   return {
//     type: LOGOUT_USER,
//     payload: { history },
//   }
// }

// export const logoutUserSuccess = () => {
//   return {
//     type: LOGOUT_USER_SUCCESS,
//     payload: {},
//   }
// }

// export const apiError = error => {
//   return {
//     type: API_ERROR,
//     payload: error,
//   }
// }

// export const socialLogin = (data, history, type) => {
//   return {
//     type: SOCIAL_LOGIN,
//     payload: { data, history, type },
//   }
// }

import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from './actionTypes';

export const login = (email, password) => async (dispatch) => {
  console.log({ email, password });
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(config);

    const {
      data: {
        data: { user },
        token,
      },
    } = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/login',
      data: { email, password },
      config,
    });

    console.log({ user, token });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
