import {DATA_LOADED, UPDATE_POSTS_COUNT} from '../constants/action-types';

const initialState = {
  posts: [],
  totalPosts: 0,
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        posts: action.payload,
      };
      break;
    case UPDATE_POSTS_COUNT:
      return {
        ...state,
        totalPosts: action.payload,
      };
      break;
  }
  return state;
}

export const dataAvailable = (data) => {
  return {
    type: DATA_LOADED,
    payload: data,
  };
};

export const updatePostCount = (totalPosts) => {
  return {
    type: UPDATE_POSTS_COUNT,
    payload: totalPosts,
  };
};

export default dataReducer;
