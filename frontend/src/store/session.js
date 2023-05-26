import { csrfFetch } from './csrf';

// Action Type
const SET_SESSION_USER = 'session/SET_SESSION_USER';
const CLEAR_SESSION_USER = 'session/CLEAR_SESSION_USER';

// Action Creators
const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  payload: user,
})

const clearSessionUser = () => ({
  type: CLEAR_SESSION_USER,
})

// Thunk action creators
export const login = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
  };
}

export const signup = (user) => async dispatch => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
  };
};

export const logout = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(clearSessionUser());
    return response;
  };
}

// Initial state
const initialState = {
  user: null,
};

// Reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case CLEAR_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
