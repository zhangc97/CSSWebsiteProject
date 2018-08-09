import React from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router, Route, Switch, Redirect, Link, browserHistory, withRouter } from 'react-router-dom'
import Logout from './loginComponents/Logout'
import Signin from './loginComponents/signin'
import register from './loginComponents/register'
import Account from './loginComponents/Account'
import { loginUser, logoutUser } from './utils/actions'

const routes = ['/signin', '/register', '/FAQ','/Account']
class Navbarlinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }

  }

  componentWillMount() {
    const appElement = document.getElementById('body')
    const route = this.props.location.pathname
    Modal.setAppElement('body')
    if (routes.includes(route)) {
      const {isOpen} = this.state;
      this.setState({ isOpen: true})
    }
  }

  toggleModal = event => {
    event.preventDefault()
    const {isOpen} = this.state;
    this.setState({ isOpen: !isOpen})
  }

  navClick = (event, path) => {
    event.preventDefault()
    console.log(path)
    this.props.history.push(path)
    this.toggleModal(event)

  }


  toggleModalClose = () => {
    const {isOpen, changePage} = this.state
    this.setState({ isOpen : !isOpen})
    this.props.history.push('/')

  }

  render() {
    //console.log(this.props)
    const {isOpen, changePage} = this.state;
    const {dispatch, isAuthenticated, errorMessage} = this.props
    return (
      <React.Fragment>
        {!isAuthenticated &&
          <React.Fragment>
            <div onClick = {(e) => this.navClick(e, '/FAQ')} className = 'nav-btn' id = 'faq'><Link to = '/FAQ' className = 'nav-link'>FAQ</Link></div>
            <div onClick = {(e) => this.navClick(e, '/register')} className = 'nav-btn' id = 'register'><Link to = '/register' className = 'nav-link'>Register</Link></div>
            <div onClick = {(e) => this.navClick(e, '/signin')} className = 'nav-btn' id = 'signin'><Link to = '/signin' className = 'nav-link'>Sign in</Link></div>
          </React.Fragment>
        }

        {isAuthenticated &&
          <React.Fragment>
            <button onClick = {(e) => this.navClick(e, '/Account')} className = 'nav-btn' id = 'account'><Link to = '/Account' className = 'nav-link'>Account</Link></button>
            <button onClick = {(e) => this.navClick(e, '/FAQ')} className = 'nav-btn' id = 'faq'><Link to = '/FAQ' className = 'nav-link'>FAQ</Link></button>
            <Logout onLogoutClick={() => dispatch(logoutUser())} />
          </React.Fragment>
        }
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0000007d',
            zIndex: 5,
          },
          content: {
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fffefe',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            width: '400px',
            height: '500px',
          }
        }}
        id = "modal_with_forms"
        isOpen = {isOpen}
        closeTimeoutMS = {150}
        contentLabel = "modalB"
        shouldCloseOnOverlayClick = {true}
        onRequestClose = {this.toggleModalClose}
        aria = {{
          labelledby: "heading",
          describedby: "fulldescription"
        }}
        >
          <Routes {...this.props} modalClose = {this.toggleModalClose}/>
        </Modal>
      </React.Fragment>

    )
  }
}
const Routes = (props) => {
  const StoreProps = props
  return(
      <React.Fragment>
          <Route path = '/register' component = {register} />
          <Route path = '/Account' render = {(props) => <Account {...props} {...StoreProps} />} />
          <Route path = '/FAQ' component = {faq} />
          <Route path = '/signin' render = {(props) => <Signin  {...props} {...StoreProps} onLoginClick={ (e,creds) => StoreProps.dispatch(loginUser(e,creds)) }/>} />
          <Route path = '/forgot-pw' component = {faq} />
          <Route path = '/forgot-user' component = {faq} />
      </React.Fragment>

  )

}
const faq = () => (
  <div>
    Hello World, this is the FAQ
  </div>
)
export default withRouter(Navbarlinks)
