import React from 'react'
import {get_user_fiddles} from '../utils/api'
import Loading from './Loading'
import Stars from 'react-star-ratings'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UserElementsListing extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      object: {}
    }
  }

  componentDidMount(){
    console.log(this.props)
    const {sorttype, element} = this.props
    const user_id = this.props.match.params.id
    get_user_fiddles(user_id,sorttype,element)
      .then(results=>this.setState(results)) //result is of namesake 'object'
      .catch(err => console.log('Error: ', err))
  }

  componentWillReceiveProps(nextProps){
    const {sorttype,element} = nextProps

    const user_id = this.props.match.params.id
    get_user_fiddles(user_id,sorttype,element)
      .then(results => this.setState(results))
      .catch(err => console.log('Error: ', err))
  }

  render(){
    const data = this.state.object.results
    return(
      data
      ? data.map((result, id) => (
        <div className = 'info-container' key = {id}>
          <div className = 'info-info-container-top' style = {{justifyContent: 'center'}}>
            <p style = {{color: 'white'}}>{result.title}</p>
            <div className = 'flex-row-custom' style ={{position: 'absolute', right: '0%'}}>
              <FontAwesomeIcon icon="star" style = {{color: 'yellow', fontSize: '14px' }}/>
              <p style = {{color: '#f7f7f7'}}>{result.stars}</p>
            </div>
          </div>
          <div className = 'info-display-container'>
            <iframe className="info-display-container" ref='iframe' frameBorder ="no" scrolling = "no" src = {`http://127.0.0.1:8000/api/fiddles/${result.post_id}/`} />
          </div>
          <div className ='info-info-container-bottom'>
            <Link to = {`/post/${result.post_id}`} className = 'info-container-link' style = {{fontSize: '14px'}}>View</Link>

          </div>
        </div>
        )
      )
      : <Loading />
    )
  }
}

export default UserElementsListing
