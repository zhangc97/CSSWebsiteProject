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
      <button onClick={this.onClick} className = 'nav-btn' ><Link to = '/'  className = 'nav-link' >
        Logout
      </Link>
      </button>
    )
  }
}

export default withRouter(Logout)

//Logout.propTypes = {
//  onLogoutClick: PropTypes.func.isRequired
//}
