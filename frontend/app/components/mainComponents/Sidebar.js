import React from 'react'
import {Link, BrowserRouter, withRouter} from 'react-router-dom'
import {pageChange} from '../utils/actions'
const selection = ['Button','Table', 'List', 'Link', 'Text', 'Select', 'Form', 'Animation']
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const style = {
  textDecoration: 'none',
  color: '#040404b5',
  fontSize: '28px',
}

class Sidebar extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

    const {dispatch, isAuthenticated, errorMessage} = this.props
    return (
      <React.Fragment>
        <div className = 'item-selector'>
          {selection.map((result, id)=> (
            <div className='sidebar-items' key = {id}>
              <Link to ={`/${result}`} style={style}>&lt;{result} /&gt;</Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}


export default withRouter(Sidebar)
