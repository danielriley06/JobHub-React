import { checkHttpStatus, parseJSON } from '../../../utils'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import fetch from 'isomorphic-fetch'
import toObj from 'form-data-to-object'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin (data) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    data
  }
}

function receiveLogin (response) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: response.data.id_token
  }
}

function loginError (message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout () {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout () {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginUser (data) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/login',
      headers: { 'Content-Type':'application/json' },
      data: data
    })
    .then(function (response) {
      console.log(response)
      localStorage.setItem('auth_token', response.data.auth_token)
      dispatch(receiveLogin(response))
      window.location.href = '/'
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

export function signupUser (data) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/users',
      headers: { 'Content-Type':'application/json' },
      data: data
    })
    .then(function (response) {
      console.log(response)
      localStorage.setItem('auth_token', response.data.auth_token)
      dispatch(receiveLogin(response))
      window.location.href = '/'
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
