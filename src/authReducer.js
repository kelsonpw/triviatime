import {
  LOADING_USER,
  USER_RECEIVED,
  UPDATE_USER,
  UPDATED_USER,
  API_ERROR
} from './authActions';

const defaultState = {
  loading: false,
  user: null,
  error: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOADING_USER:
      return { ...state, loading: true };
    case USER_RECEIVED:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER:
      return { ...state, loading: true };
    case UPDATED_USER:
      return { ...state, loading: false, user: action.payload };
    case API_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
}
