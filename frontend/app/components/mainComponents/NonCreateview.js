import React from 'react'
import NavDesktop from '../Nav'
import Elements from './Elements'
import {stayLogin} from '../utils/actions'
import Sidebar from './Sidebar'
import Leaderboard from './Leaderboard'


class NonCreateView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      layoutMode: this.getLayoutMode()
    }
    this.onResize = this.onResize.bind(this)
  }
  componentDidMount(){
    if(localStorage.token && localStorage.token.length > 2 ){
      this.props.dispatch(stayLogin(localStorage.token))
    }
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setState({
      layoutMode: this.getLayoutMode(),
    })
  }
  getLayoutMode() {
    return window.innerWidth > 1260
      ? 'desktop'
      : 'mobile'
  }

  render(){
    const {dispatch, isAuthenticated, errorMessage} = this.props
    return(
      <React.Fragment>
        {this.state.layoutMode == 'desktop'
          ? (<div className= 'sidebar-container'>
            <Sidebar
              dispatch = {dispatch}
              isAuthenticated = {isAuthenticated}
              errorMessage = {errorMessage}/>
          </div>)
          : (<div>sdfsdfsfd</div>)}
        <div className = 'elements-container'>

              <Elements {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}

export default NonCreateView
