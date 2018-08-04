import React from 'react'

const SignInPage = (props)=> (
  <div className = 'input-container'>
    <h1>Sign In</h1>
    <SignInForm {...props} />
  </div>
)

const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})
class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  componentwillMount(){
    console.log('hello')
  }


  onSubmit = (event) => {
    const email = this.state.email
    const password = this.state.password
    const creds = {
      email,
      password
    }
    this.props.onLoginClick(event, creds).then(res => {
      if(res == true){
        this.props.modalClose()
        this.props.history.push('/')
      }
    })
  }

  render() {

    const errorMessage = this.props.errorMessage
    const {
      email,
      password,
      error
    } = this.state;
    const isInvalid = (
      email === '' ||
      password === ''
    )
    return (
      <form onSubmit = {this.onSubmit}  className = 'sign-in-container' id = 'sign-in-container'>
        <input
          value = {email}
          onChange = {event => this.setState(byPropKey('email', event.target.value))}
          type = 'text'
          placeholder = 'Email Address'
          className = 'input-style'
          id = 'email'
        />
        <input
          value = {password}
          onChange = {event => this.setState(byPropKey('password', event.target.value))}
          type = 'password'
          placeholder = 'Password'
          className = 'input-style'
          id = 'password'
        />
        <button disabled = {isInvalid} type = 'submit' className = 'btn' id='submit'>
          Sign In
        </button>
        <div>
        </div>
        { (errorMessage.length > 0) && <p>Email and password are incorrect</p>}
      </form>
    )
  }
}

export default SignInPage;
