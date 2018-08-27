import React, {PropTypes} from 'react'
import { Link, withRouter } from 'react-router-dom'
class Logout extends React.Component {
  constructor(props){
    super(props);
  }

  onClick = () => {
    this.props.onLogoutClick()
    window.location.reload()
  }

  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={this.onClick} className = 'nav-btn' >
        Logout
      </button>
    )
  }
}

export default withRouter(Logout)
