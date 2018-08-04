import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, PAGE_CHANGE_REQUEST
} from './actions'

//auth reducer
//checks to see if token is in local storage
//********add token expiration checker later

function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  errorMessage: '',
  pageChanging: false
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case PAGE_CHANGE_REQUEST:
      return Object.assign({}, state, {
        pageChanging: true
      })
    default:
      return state
  }
}

export default auth
