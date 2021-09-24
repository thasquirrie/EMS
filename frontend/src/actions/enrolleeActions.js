import axios from 'axios';
import {
  ADD_ENROLLEE_REQUEST,
  ENROLLEES_LIST_REQUEST,
  ENROLLEES_LIST_SUCCESS,
  ENROLLEES_LIST_FAIL,
  ADD_ENROLLEE_SUCCESS,
  ADD_ENROLLEE_FAIL,
  ENROLLEE_DETAILS_REQUEST,
  ENROLLEE_DETAILS_SUCCESS,
  ENROLLEE_DETAILS_FAIL,
  EDIT_ENROLLEE_REQUEST,
  EDIT_ENROLLEE_SUCCESS,
  EDIT_ENROLLEE_FAIL,
} from '../constants/enrolleesConstants';

export const createEnrollee = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ENROLLEE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log(data);

    const {
      data: {
        data: { enrollee },
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/enrollees',
      data,
      headers,
    });

    console.log(headers);
    console.log({ enrollee });

    dispatch({
      type: ADD_ENROLLEE_SUCCESS,
      payload: enrollee,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_ENROLLEE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getEnrolleeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLLEE_DETAILS_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log({ id });

    const {
      data: {
        data: { enrollee },
      },
    } = await axios({
      method: 'GET',
      url: `/api/v1/enrollees/${id}`,
      headers,
    });

    console.log(headers);
    console.log({ enrollee });

    dispatch({
      type: ENROLLEE_DETAILS_SUCCESS,
      payload: enrollee,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ENROLLEE_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const editEnrollee = (id, data) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_ENROLLEE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log({ id });

    const {
      data: {
        data: { enrollee },
      },
    } = await axios({
      method: 'PATCH',
      url: `/api/v1/enrollees/${id}`,
      data,
      headers,
    });

    console.log(headers);
    console.log({ enrollee });

    dispatch({
      type: EDIT_ENROLLEE_SUCCESS,
      payload: enrollee,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_ENROLLEE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const enrolleesList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLLEES_LIST_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {
      data: {
        data: { enrollees },
      },
    } = await axios({
      method: 'GET',
      url: '/api/v1/enrollees',
      headers,
    });

    console.log(headers);
    console.log({ enrollees });

    dispatch({
      type: ENROLLEES_LIST_SUCCESS,
      payload: enrollees,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ENROLLEES_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
