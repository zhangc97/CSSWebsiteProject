

export const handle_signup = (e,data) => {
  e.preventDefault();
  console.log(data)
  fetch('http://127.0.0.1:8000/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json()
    .then(user => ({user,res})))
    .then(({user,res}) => {
      if(!res.ok) {
        console.log('sdfsdf')
        return Promise.reject(user)
      } else {
        return user
      }
    })
}

export const handle_logout = () => {
  localStorage.removeItem('token');
}
