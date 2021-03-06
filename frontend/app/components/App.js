import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {BrowserRouter, withRouter, Switch, Route} from 'react-router-dom'
import { stayLogin, loginUser } from './utils/actions'
import NavbarLinks from './Navbarlinks'
import CreateView from './mainComponents/Createview'
import NonCreateView from './mainComponents/NonCreateview'
import UserView from './mainComponents/UserView'
import Nav from './Nav'

import PostView from './mainComponents/PostView'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faUser, faStar, faHome, faEdit, faCloudUploadAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faUser, faStar, faHome, faEdit, faCloudUploadAlt, faEnvelope)

class App extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    if(localStorage.token && localStorage.token.length > 2 ){
      this.props.dispatch(stayLogin(localStorage.token))
    }

  }
  render(){
    const {dispatch, isAuthenticated, errorMessage} = this.props
    //Add API Call to check if user, if it is then keep logged in
    return (
      <div className = 'main-container'>

          <ContentContainerRoutes {...this.props}/>
          <div className = 'top-bar'>
            <Nav
              {...this.props}
              ref = {this.nav}
              isAuthenticated = {isAuthenticated}
              errorMessage = {errorMessage}
              history = {history}
            />
          </div>
      </div>
    )
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}


const ContentContainerRoutes = (ReduxProps) => {
  return (
    <React.Fragment>
      <Switch>
        {ReduxProps.isAuthenticated
          ? <Route exact path = '/create' render = {(props)=> <CreateView {...props} {...ReduxProps} />}  />
          : null }
        <Route exact path = '/users/:id' key = 'user' render = {(props) => <UserView {...props} {...ReduxProps}/>}/>
        <Route exact path = '/post/:post_id' key = 'postview' render = {(props) => <PostView {...props} {...ReduxProps} />} />
        <Route path = '/' render = {(props) => <NonCreateView {...props} {...ReduxProps}/>} />
        <Route path = '/Button' key = 'button' render = {(props) => <NonCreateView filter = 'button' {...props} {...ReduxProps}/>} />
        <Route path = '/Table' key = 'table' render = {(props) => <NonCreateView filter = 'table' {...props} {...ReduxProps}/>} />
        <Route path = '/List' key = 'list' render = {(props) => <NonCreateView filter = 'list' {...props} {...ReduxProps}/>} />
        <Route path = '/Link' key = 'link' render = {(props) => <NonCreateView filter = 'link' {...props} {...ReduxProps}/>} />
        <Route path = '/Text' key = 'text' render = {(props) => <NonCreateView filter = 'text' {...props} {...ReduxProps}/>} />
        <Route path = '/Select' key = 'select' render = {(props) => <NonCreateView filter = 'select' {...props} {...ReduxProps}/>} />
        <Route path = '/Form' key = 'form' render = {(props) => <NonCreateView filter = 'form' {...props} {...ReduxProps}/>} />
        <Route path = '/Animation' key = 'animation' render = {(props) => <NonCreateView filter = 'animation' {...props} {...ReduxProps}/>} />

      </Switch>
    </React.Fragment>
      )
}


//These props come from the application's state when its started
function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, errorMessage, pageChanging } = state

  return {
    isAuthenticated,
    errorMessage,
    pageChanging
  }
}
export default connect(mapStateToProps, null, null, {pure:false})(App)
