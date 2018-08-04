

export const handle_signup = (e,data) => {
  e.preventDefault();
  fetch('http://localhost:8000/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token)
    })

  return true
}

export const handle_logout = () => {
  localStorage.removeItem('token');
}
