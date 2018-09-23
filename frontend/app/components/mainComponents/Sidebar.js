import React from 'react'
import {Link, BrowserRouter, withRouter} from 'react-router-dom'
import {pageChange} from '../utils/actions'
import button from '../utils/button.png'
import form from '../utils/form.png'
import link from '../utils/link.png'
import list from '../utils/list.png'
import select from '../utils/select.png'
import table from '../utils/table.png'
import text from '../utils/text.png'
import other from '../utils/other.png'

const selection = ['Button','Table', 'List', 'Link', 'Text', 'Select', 'Form', 'Other']
const selection_icon = [button, table, list, link, text, select, form, other]

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const style = {
  textDecoration: 'none',
  color: '#040404b5',
  fontSize: '20px',
}

class Sidebar extends React.Component {
  constructor(props){
    super(props)
  }

  navClick = (event,path) => {
    event.preventDefault();
    this.props.history.push(path);
  }
  render(){

    const {dispatch, isAuthenticated, errorMessage} = this.props
    var i = -1;
    return (
      <React.Fragment>

        <div className = 'item-selector'>
          {selection.map((result, id)=> {
            i++
            return(
              <div className='sidebar-items' key = {id} onClick = {(e) => this.navClick(e, `/${result}`)} >
                <img src = {selection_icon[i]} style = {{width:'25px', height:'25px'}}>
                </img>
                <Link to ={`/${result}`} style={style}>&lt;{result} /&gt;</Link>
              </div>
            )
          })}
          <div className='sidebar-items' style = {{width:'230px'}} onClick = {(e) => this.navClick(e, '/')}>
              <Link to = {'/'} style = {style}>All</Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default withRouter(Sidebar)
