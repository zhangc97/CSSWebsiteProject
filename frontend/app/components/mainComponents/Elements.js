import React from 'react'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import Dropdown from 'react-dropdown'
import './componentStyling/dropdown.css';
import {displayCode} from '../utils/actions'
import ListingBlock from './ListingBlock'
import ElementsListing from './ElementsListing'


const options = [
  {value: '-votes', label: 'Most Popular'},
  {value: '-stars', label: 'Highest Rated'},
  {value: 'none', label: 'Most Recent'},
  {value: 'votes', label: 'Least Popular'},
  {value: 'stars', label: 'Lowest Rated'},
]

const routes = ['/Button', '/Table', '/List', '/Link', '/Text', '/Select', '/Form', '/Animation']

const routeConvert = (currentroute) => {
  switch(currentroute) {
    case '/Button':
      return 'button'
    case '/Table':
      return 'table'
    case '/List':
      return 'list'
    case '/Link':
      return 'link'
    case '/Text':
      return 'text'
    case '/Select':
      return 'select'
    case '/Form':
      return 'form'
    case '/Animation':
      return 'animation'
  }
}

class Elements extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sorttype: 'none',
      data:[],
      currentpagenumber: 1,
      count: null,
      fetching: true,
      route: '',
    }
    this.handleChange=this.handleChange.bind(this)

  }

  componentDidMount(){
    const currentroute = this.props.location.pathname
    if (routes.includes(currentroute)){
      this.setState({route: routeConvert(currentroute)})
    }
    this.initialSearch(this.state.sorttype, routeConvert(currentroute))
  }

  componentDidUpdate() {
    const current_route = routeConvert(this.props.location.pathname)
    const pre_refresh_route = this.state.route
    if(current_route != pre_refresh_route) {
      this.setState({
        route: current_route
      })
      this.initialSearch(this.state.sorttype, current_route)
    }
  }


  handleChange = (selectedOption) => {
    this.setState({sorttype: selectedOption.value, dropdownvalue: selectedOption, fetching: true})
    this.initialSearch(selectedOption.value, this.state.route)
  }

  initialSearch = (sorttype, route) => {
    const {currentpagenumber, fetching } = this.state
    this.props.dispatch(displayCode(sorttype, route, currentpagenumber))
      .then(res => this.setState({data: res.object.results, fetching: false, currentpagenumber: 1,}))
      .catch(err => console.log('Error: ', err))
  }

  render(){
    const { sorttype, dropdownvalue, route } = this.state;
    return(
      <React.Fragment>
        <div className = 'sort-bar-overlay'></div>
        <div className = 'sort-bar'>

          <div className = 'sort-container'>
            <h4 className = 'date-label'>Sort By:</h4>
            <Dropdown
              onChange= {this.handleChange}
              options = {options}
              value={dropdownvalue}
              clearable={false}
              placeholder = "Sort by"
              name='date-selecter'
              />
          </div>
        </div>
        {this.state.fetching
          ? null
          : <ElementsListing
            sorttype={sorttype}
            route = {route}
            data = {this.state.data}
            pagenumber = {this.state.currentpagenumber}
            count = {this.state.count}
            {...this.props}/>}
      </React.Fragment>
    )
  }
}

export default Elements
