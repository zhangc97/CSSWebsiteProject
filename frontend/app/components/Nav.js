import React, {Component} from 'react'
import NavBarLinks from './Navbarlinks'
import {BrowserRouter, Link, UpdateBlocker, withRouter} from 'react-router-dom'
import {pageChange} from './utils/actions'
import Leaderboard from './mainComponents/Leaderboard'

class NavDesktop extends React.Component {
  constructor(props){
    super(props);
  }
  render() {

    const {isAuthenticated, errorMessage, dispatch} = this.props
    return (
        <React.Fragment>
          <div className = 'logo-container' onClick = {()=> this.props.history.push('/')}>
            logo
          </div>
          <div className = 'links-container'>
            {isAuthenticated
              ? <div onClick = {() => this.props.history.push('/create')} className = 'create-btn'>Create</div>
              : null}
            <div className = 'account-nav-links'>
              <NavBarLinks
                {...this.props}/>
            </div>

          </div>

        </React.Fragment>
    )
  }
}


export default withRouter(NavDesktop)
