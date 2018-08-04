import React from 'react'
import NavDesktop from '../Nav'
import Elements from './Elements'
import {stayLogin} from '../utils/actions'



class NonCreateView extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    if(localStorage.token && localStorage.token.length > 2 ){
      this.props.dispatch(stayLogin(localStorage.token))
    }
  }


  render(){
    const {dispatch, isAuthenticated, errorMessage} = this.props
    return(
      <React.Fragment>
        <div className = 'elements-container'>
          
              <Elements {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}

export default NonCreateView
