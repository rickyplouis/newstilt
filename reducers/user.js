import * as types from '../actions/actionTypes';

const initialState = {
  user: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: state.user
      };
    default:
      return state;
  }
}
