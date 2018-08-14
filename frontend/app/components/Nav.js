import React, {Component} from 'react'
import NavBarLinks from './Navbarlinks'
import {BrowserRouter, Link, UpdateBlocker, withRouter} from 'react-router-dom'
import {pageChange} from './utils/actions'
import Leaderboard from './mainComponents/Leaderboard'

class NavDesktop extends React.Component {
  constructor(props){
    super(props);
    this.modal = React.createRef()
  }
  onClick = (e , path) => {
    e.preventDefault()
    this.modal.current.toggleModalClose()
    this.props.history.push(path)
  }

  render() {

    const {isAuthenticated, errorMessage, dispatch} = this.props
    return (
        <React.Fragment>
          <div className = 'logo-container' onClick = {(e) => this.onClick(e, '/')}>
            logo
          </div>
          <div className = 'links-container'>

            <div className = 'account-nav-links'>
              <NavBarLinks
                ref = {this.modal}
                {...this.props}/>
            </div>
            {isAuthenticated
              ? <div onClick = {(e) => this.onClick(e, '/create')} className = 'create-btn'>Create</div>
              : null}

          </div>

        </React.Fragment>
    )
  }
}


export default withRouter(NavDesktop)
