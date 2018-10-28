import axios from 'axios';

export const LOADING_USER = 'fetching_user';
export const USER_RECEIVED = 'fetch_user_success';
export const UPDATE_USER = 'fetching_updated_user';
export const UPDATED_USER = 'fetch_updated_user_success';
export const API_ERROR = 'fetch_user_failure';

const apiUrl = 'http://localhost:5000/users';

export function signInAction({ username }, history) {
  return async dispatch => {
    try {
      dispatch({ type: LOADING_USER });
      const res = await axios.post(apiUrl + `/account`, { username });
      dispatch({ type: USER_RECEIVED, payload: res.data });
      localStorage.setItem('username', username);
      history.push('/question');
    } catch (err) {
      dispatch({
        type: API_ERROR,
        payload: err.message
      });
    }
  };
}

export function getUserAction(username) {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_USER });
      const res = await axios.get(apiUrl + '/' + username);
      dispatch({ type: UPDATED_USER, payload: res.data });
    } catch (err) {
      dispatch({
        type: API_ERROR,
        payload: err.message
      });
    }
  };
}
