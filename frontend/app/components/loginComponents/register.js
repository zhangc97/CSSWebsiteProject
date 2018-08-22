import React from 'react';
import {handle_signup} from '../utils/loginAPI'

const SignUpPage = ({history}) => (
  <div className = 'register-input-container'>
    <span className = 'modal-h1'>Sign Up</span>
    <SignUpForm history = {history} />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  success: false,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      passwordOne: '',
      passwordTwo: '',
      error:null,
      success:false,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    const email = this.state.email
    const username = this.state.username
    const password = this.state.passwordOne
    const signup_credentials = {
      email,
      username,
      password,
    }
    console.log('here')
    console.log(handle_signup(e,signup_credentials))
    if(handle_signup(e,signup_credentials)){
      this.props.history.push('/signin')
      this.setState({
        success: true,
      })
    }
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid = (
      email === '' ||
      username === '' ||
      passwordOne === '' ||
      passwordTwo === ''
    )
    return (
      <form onSubmit = {this.onSubmit} className = 'sign-in-container' id = 'sign-up-container'>
          <input
            value = {username}
            onChange = {event => this.setState(byPropKey('username', event.target.value))}
            type = 'text'
            placeholder = 'Username'
            className = 'input-style'
            id = 'username'
          />
        <input
          value = {email}
          onChange = {event => this.setState(byPropKey('email', event.target.value))}
          type = 'text'
          placeholder = 'Email Address'
          className = 'input-style'
          id = 'email'
        />
        <input
          value = {passwordOne}
          onChange = {event => this.setState(byPropKey('passwordOne', event.target.value))}
          type = 'password'
          placeholder = 'Password'
          className = 'input-style'
          id = 'passwordOne'
        />
        <input
          value = {passwordTwo}
          onChange = {event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type = 'password'
          placeholder = 'Confirm Password'
          className = 'input-style'
          id = 'passwordTwo'
        />
        <button disabled = {isInvalid} type = 'submit'  id='submit' className = 'btn'>
          Register
        </button>
        {error && <p>{error.message}</p>}
        {this.state.success && <p>Registration successful</p>}
      </form>
    )
  }
}

export default SignUpPage
