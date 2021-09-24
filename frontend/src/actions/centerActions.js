import axios from 'axios';
import {
  ADD_CENTER_REQUEST,
  CENTERS_LIST_REQUEST,
  CENTERS_LIST_SUCCESS,
  CENTERS_LIST_FAIL,
  ADD_CENTER_SUCCESS,
  ADD_CENTER_FAIL,
} from '../constants/centerConstants';

export const addCenter = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_CENTER_REQUEST });

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
        data: { centers },
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/centers',
      data,
      headers,
    });

    console.log(headers);
    console.log({ centers });

    dispatch({
      type: ADD_CENTER_SUCCESS,
      payload: centers,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CENTER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const centersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CENTERS_LIST_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // let token = '';
    // if (userInfo) {
    //   token = userInfo.token;
    // }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {
      data: {
        data: { centers },
      },
    } = await axios({
      method: 'GET',
      url: '/api/v1/centers',
      headers,
    });

    console.log(headers);
    console.log({ centers });

    dispatch({
      type: CENTERS_LIST_SUCCESS,
      payload: centers,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CENTERS_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
