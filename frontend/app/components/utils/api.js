export const handle_stars = (data) => {
  var url = 'http://127.0.0.1:8000/api/fiddles/votesubmit/'
  let config = {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Token ' + localStorage.token
    },
    body: JSON.stringify(data)
  }

  fetch(url,config)
    .then(res => res ? true : false)

  return false
}

export const update_profile = (data) => {
  var url = 'http://127.0.0.1:8000/api/profile'
  let config = {
    method: 'PATCH',
    headers: {
      'Authorization' : 'Token ' + localStorage.token
    },
    body: data
  }
  console.log(data.get('file'))
  if(fetch(url, config)
    .then(res => res ? true : false)){
      return true
    } else {
      return false
    }

}

export const fetch_profile = (token) => {
  var url = 'http://127.0.0.1:8000/api/user'

  let config = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  return fetch(url, config)
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
}

export const fetch_leaderboard = () => {
  var url = 'http://127.0.0.1:8000/api/profiles/get/?ordering=-total_stars&page=1'

  let config = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
    }
  }
  return fetch(url, config)
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
}

export const get_user_fiddles = (user_id, sorttype, element) => {
  var url = `http://127.0.0.1:8000/api/fiddles/get?fiddle_owner=${user_id}`

  if(element.length > 2){
    url = url + `&HTMLelement=${element}`
  }
  if(sorttype.length >2 && sorttype != 'none'){
    url = url + `&ordering=${sorttype}`
  }
  let config = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
    }
  }

  return fetch(url, config)
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
}

export const get_code = (post_id) => {
  var url = `http://127.0.0.1:8000/api/fiddles/get?post_id=${post_id}`
  let config = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
    }
  }
  return fetch(url, config)
    .then(res => res.json())
    .catch(err => console.log('Error :', err))
}

export const get_profile = (user_id) => {
  var url = `http://127.0.0.1:8000/api/profiles/${user_id}`
  let config = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
    }
  }

  return fetch(url, config)
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))

}
