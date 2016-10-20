import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from './actions'

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }

const ACTION_HANDLERS = {
  [LOGIN_REQUEST] : (state, action) => ({ ...state, isFetching: true,
  isAuthenticated: false,
  user: action.creds }),
  [LOGIN_SUCCESS] : (state, action) => ({ ...state, isFetching: false,
  isAuthenticated: true,
  id_token: action.id_token, 
  errorMessage: '' }),
  [LOGIN_FAILURE] : (state, action) => ({ ...state, isFetching: false,
  isAuthenticated: false,
  errorMessage: action.message }),
  [LOGOUT_SUCCESS] : (state, action) => ({ ...state, isFetching: true,
  isAuthenticated: false })
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
