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
          <div className = 'links-container'>
            <NavBarLinks
              {...this.props}/>
          </div>
          <div className = 'profile-display-container'>
          {isAuthenticated
            ? <div onClick = {() => dispatch(pageChange())}><Link to ='/create'>Add</Link></div>
            : null}
          </div>
          <Leaderboard />
        </React.Fragment>
    )
  }
}


export default NavDesktop
