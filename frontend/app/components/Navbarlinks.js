import React from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router, Route, Switch, Redirect, Link, browserHistory, withRouter } from 'react-router-dom'
import Logout from './loginComponents/Logout'
import Signin from './loginComponents/signin'
import Register from './loginComponents/register'
import Account from './loginComponents/Account'
import Leaderboard from './mainComponents/Leaderboard'
import { loginUser, logoutUser } from './utils/actions'

const routes = ['/signin', '/register', '/FAQ','/Account','/Leaderboard']

class Navbarlinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      modal_path: '',
    }

  }

  componentWillMount() {
    const appElement = document.getElementById('body')
    const route = this.props.location.pathname
    Modal.setAppElement('body')
    if (routes.includes(route)) {
      const {isOpen} = this.state;
      this.setState({ isOpen: true, modal_path: route})
    }
  }


  toggleModal = event => {
    event.preventDefault()
    const {isOpen} = this.state;
    this.setState({ isOpen: true})
  }

  navClick = (event, path) => {
    event.preventDefault()
    this.setState({
      modal_path: path
    })
    this.toggleModal(event)
  }


  toggleModalClose = () => {
    const {isOpen, changePage} = this.state
    this.setState({ isOpen : false})

  }

  render() {
    const {isOpen, modal_path} = this.state;
    const {dispatch, isAuthenticated, errorMessage} = this.props
    let modal_background = '#f4f5ff'
    let styles = {
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
        background: modal_background,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        border: '0',
        padding: '5px'
      }
    }
    return (
      <React.Fragment>
        {!isAuthenticated &&
          <React.Fragment>
            <button onClick = {(e) => this.navClick(e, '/Leaderboard')} className = 'nav-btn' id = 'leaderboard' style = {{width: '120px'}}>Leaderboard</button>
            <button onClick = {(e) => this.navClick(e, '/FAQ')} className = 'nav-btn' id = 'faq' style = {{width: '60px'}}>FAQ</button>
            <button onClick = {(e) => this.navClick(e, '/register')} className = 'nav-btn' id = 'register'>Register</button>
            <button onClick = {(e) => this.navClick(e, '/signin')} className = 'nav-btn' id = 'signin'>Sign in</button>
          </React.Fragment>
        }

        {isAuthenticated &&
          <React.Fragment>
            <button onClick = {(e) => this.navClick(e, '/Leaderboard')} className = 'nav-btn' id = 'leaderboard' style = {{width: '120px'}}>Leaderboard</button>
            <button onClick = {(e) => this.navClick(e, '/FAQ')} className = 'nav-btn' id = 'faq' style = {{width: '60px'}}>FAQ</button>
            <button onClick = {(e) => this.navClick(e, '/Account')} className = 'nav-btn' id = 'account' style = {{width: '80px'}}>Account</button>
            <Logout onLogoutClick={() => dispatch(logoutUser())} />
          </React.Fragment>
        }
      <Modal
        style={styles}
        id = "modal_with_forms"
        isOpen = {isOpen}
        closeTimeoutMS = {0}
        contentLabel = "modalB"
        shouldCloseOnOverlayClick = {true}
        onRequestClose = {this.toggleModalClose}
        aria = {{
          labelledby: "heading",
          describedby: "fulldescription"
        }}
        >
          <Routes modal_path = {modal_path} {...this.props} modalClose = {this.toggleModalClose}/>
        </Modal>
      </React.Fragment>

    )
  }
}
const Routes = (props) => {
  const StoreProps = props
  console.log(StoreProps)
  const modal_path = StoreProps.modal_path
  switch(modal_path) {
    case '/Leaderboard':
      return <Leaderboard />
      break;
    case '/register':
      return <Register />
      break;
    case '/Account':
      return <Account {...StoreProps} />
      break;
    case '/FAQ':
      return <Faq />
      break;
    case '/signin':
      return <Signin {...StoreProps} onLoginClick={ (e,creds) => StoreProps.dispatch(loginUser(e,creds)) }/>
      break;
    default:
      return null
  }


}
const Faq = () => (
  <div className = 'faq-container'>
    <h4>What is this website?</h4>
    <p>When I first started web developing I noticed my sites were very mundane and plain. Any sort of decorative HTML/CSS materials I found online
      were either extremely complicated or required libraries I did not know how to use. So I decided to create _____ which allows fellow beginner web developers
      to post and share their unique and simple design elements
    </p>
    <h4>How do I post an element?</h4>
    <p>
      Simply register for an account, log in and then click create. Only CSS and HTML are offered at the moment because the goal of this site is to keep everything simple
      and beginner friendly
    </p>
    <h4>What are stars for?</h4>
    <p>
      The short answer, Nothing. They're mearly a scoring system that I thought would add a little bit of competitive edge to this site.
    </p>
    <h4>Who are you?</h4>
    <p>
      I'm a student currently finishing up his degree in Computer Engineering who enjoys web design in his spare time.
    </p>

  </div>
)
export default Navbarlinks
