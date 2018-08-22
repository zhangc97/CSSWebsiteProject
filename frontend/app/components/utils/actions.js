export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const PAGE_CHANGE_REQUEST = 'PAGE_CHANGE_REQUEST'
export const PAGE_CHANGE_SUCCESS = 'PAGE_CHANGE_SUCCESS'
export const CODE_SUBMIT_REQUEST = 'CODE_SUBMIT_REQUEST'
export const CODE_SUBMIT_SUCCESS = 'CODE_SUBMIT_SUCCESS'
export const CODE_DISPLAY_REQUEST = 'CODE_DISPLAY_REQUEST'
export const CODE_DISPLAY_SUCCESS = 'CODE_DISPLAY_SUCCESS'

function requestCodeData(){
  return{
    type: CODE_DISPLAY_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  }
}
function receiveCodeData(){
  return{
    type: CODE_DISPLAY_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
  }
}
function requestCodeSubmit(){
  return {
    type: CODE_SUBMIT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  }
}

function receiveCodeSubmit(){
  return {
    type: CODE_SUBMIT_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
  }
}

function requestPageChange() {
  return {
    type: PAGE_CHANGE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    pageChanging: true,
  }
}
function receivePageChange() {
  return {
    type: PAGE_CHANGE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    pageChanging: false,
  }
}
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

 export function stayLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: token
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function displayCode(sort, route, pagenumber){
  console.log(sort, route, pagenumber)

  var url = `http://127.0.0.1:8000/api/fiddles/get?page=${pagenumber}`
  if (sort && sort != 'none') {
    url = url + `&ordering=${sort}`
  }
  if (route) {
    url = url + `&HTMLelement=${route}`
  }

  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return dispatch => {
    dispatch(requestCodeData())

    return fetch(url, config)
      .then(res=> res.json()
      .then(user => ({user, res})))
      .then(({user, res}) => {
        return user
      }).catch(err => console.log('Error: ', err))
  }
}

export function sendCode(e, data) {
  e.preventDefault()
  console.log('sderer')
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.token
    },
    body: JSON.stringify(data)
  }
  console.log(config)
  return dispatch => {
    dispatch(requestCodeSubmit(data))

    return fetch('http://127.0.0.1:8000/api/fiddles', config)
      .then(res => res.json()
      .then(user => ({user, res})))
      .then(({user,res}) => {
        if(!res.ok){
          return Promise.reject(user)
        } else{
          dispatch(receiveCodeSubmit())
          return true
        }
      }).catch(err => console.log("Error: ", err))

  }
}

export function loginUser(e, creds) {
  e.preventDefault()
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }
  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch('http://localhost:8000/api/users/login', config)
      .then(res => res.json()
      .then(user => ({user, res})))
      .then(({ user, res}) => {
        if(!res.ok) {
          //dispatch error condition
          //errorMessage = user.user.errors.error[0] //JSON location of error message found through console
          dispatch(loginError(user.errors.error[0]))
          return Promise.reject(user)
        } else {
          //Fix backend JSON renderer to enable easier parsing
          localStorage.setItem('user', user.user.email)
          localStorage.setItem('token', user.user.token)

          dispatch(receiveLogin(user))
          return true
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}

export function pageChange() {
  return dispatch => {
    dispatch(requestPageChange())
    dispatch(receivePageChange())
  }
}
