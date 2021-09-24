import axios from 'axios';
import {
  EDIT_USER_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  // USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
} from '../store/auth/login/actionTypes';

export const signup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: {
        data: { user },
        token,
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data,
      config,
    });

    // const { user, token } = data.data;
    // console.log(data);
    // console.log('token:', token);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { user, token },
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const superAdminSignup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: {
        data: { user },
        token,
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/users/superAdmin',
      data,
      config,
    });

    // const { user, token } = data.data;
    // console.log(data);
    // console.log('token:', token);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { user, token },
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(USER_LOGIN_REQUEST);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(email, password);

    const {
      data: {
        data: { user },
        token,
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email, password },
      config,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const usersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log(headers);

    const {
      data: {
        data: { users },
      },
    } = await axios({
      method: 'GET',
      url: '/api/v1/users',
      headers,
    });

    console.log(headers);
    console.log({ users });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: users,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const addUser = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    // console.log(headers);

    const {
      data: {
        data: { user },
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/users/create-user',
      data,
      headers,
    });

    console.log(headers);
    console.log({ user });

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    // console.log(headers);

    const {
      data: {
        data: { user },
      },
    } = await axios({
      method: 'GET',
      url: `/api/v1/users/${id}`,

      headers,
    });

    console.log(headers);
    console.log({ user });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const editUser = (id, data) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_USER_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    // console.log(headers);

    const {
      data: {
        data: { user },
      },
    } = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${id}`,
      data,
      headers,
    });

    console.log(headers);
    console.log({ user });

    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
