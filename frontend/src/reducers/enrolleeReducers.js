import {
  ADD_ENROLLEE_REQUEST,
  ADD_ENROLLEE_SUCCESS,
  ADD_ENROLLEE_FAIL,
  ENROLLEES_LIST_FAIL,
  ENROLLEES_LIST_REQUEST,
  ENROLLEES_LIST_RESET,
  ENROLLEES_LIST_SUCCESS,
  EDIT_ENROLLEE_REQUEST,
  EDIT_ENROLLEE_SUCCESS,
  EDIT_ENROLLEE_FAIL,
  EDIT_ENROLLEE_RESET,
  ENROLLEE_DETAILS_REQUEST,
  ENROLLEE_DETAILS_SUCCESS,
  ENROLLEE_DETAILS_FAIL,
  ENROLLEE_DETAILS_RESET,
} from '../constants/enrolleesConstants';

export const addEnrolleeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENROLLEE_REQUEST:
      return { loading: true };
    case ADD_ENROLLEE_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        success: true,
        enrollee: action.payload,
      };
    case ENROLLEES_LIST_RESET:
      return {
        enrollees: {},
      };
    case ADD_ENROLLEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editEnrolleeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ENROLLEE_REQUEST:
      return { loading: true };
    case EDIT_ENROLLEE_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        success: true,
        enrollee: action.payload,
      };
    case EDIT_ENROLLEE_RESET:
      return {
        enrollees: {},
      };
    case EDIT_ENROLLEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const enrolleeDetailsReducer = (state = { enrollee: {} }, action) => {
  switch (action.type) {
    case ENROLLEE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ENROLLEE_DETAILS_SUCCESS:
      return { loading: false, enrollee: action.payload };
    case ENROLLEE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ENROLLEE_DETAILS_RESET:
      return { enrollee: {} };
    default:
      return state;
  }
};

export const enrolleeListReducer = (state = { enrollees: [] }, action) => {
  switch (action.type) {
    case ENROLLEES_LIST_REQUEST:
      return { loading: true };
    case ENROLLEES_LIST_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        enrollees: action.payload,
      };
    case ENROLLEES_LIST_RESET:
      return {
        enrollees: [],
      };
    case ENROLLEES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
