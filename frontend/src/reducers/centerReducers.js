import {
  ADD_CENTER_REQUEST,
  ADD_CENTER_SUCCESS,
  ADD_CENTER_FAIL,
  CENTERS_LIST_FAIL,
  CENTERS_LIST_REQUEST,
  CENTERS_LIST_RESET,
  CENTERS_LIST_SUCCESS,
} from '../constants/centerConstants';

export const addCenterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CENTER_REQUEST:
      return { loading: true };
    case ADD_CENTER_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        success: true,
        center: action.payload,
      };
    // case CENTERS_LIST_RESET:
    //   return {
    //     enrollees: [],
    //   };
    case ADD_CENTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const centerListReducer = (state = { centers: [] }, action) => {
  switch (action.type) {
    case CENTERS_LIST_REQUEST:
      return { loading: true };
    case CENTERS_LIST_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        centers: action.payload,
      };
    case CENTERS_LIST_RESET:
      return {
        centers: [],
      };
    case CENTERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
