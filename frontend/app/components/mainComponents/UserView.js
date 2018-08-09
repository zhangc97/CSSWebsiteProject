import React from 'react'
import {get_profile} from '../utils/api'
import Loading from './Loading'
import Stars from 'react-star-ratings'
import UserElementsListing from './UserElementsListing'
import Dropdown from 'react-dropdown'
import './componentStyling/dropdown.css';

const options = [
  {value: '-votes', label: 'Most Popular'},
  {value: '-stars', label: 'Highest Rated'},
  {value: 'none', label: 'Most Recent'},
  {value: 'votes', label: 'Least Popular'},
  {value: 'stars', label: 'Lowest Rated'},
]

const elementoptions = [
  {value: 'button', label: 'Button'},
  {value: 'table', label: 'Table'},
  {value: 'list', label: 'List'},
  {value: 'link', label: 'Link'},
  {value: 'text', label: 'Text'},
  {value: 'select', label: 'Select'},
  {value: 'form', label: 'Form'},
  {value: 'animation', label: 'Animation'},
]
class UserView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sorttype: '',
      element: '',
      sort_value: '',
      element_value: '',
    }
  }

  componentDidMount(){
    console.log(this.props)
    const user_id = this.props.match.params.id
    get_profile(user_id)
      .then(profile => this.setState(profile))
  }

  handleChangeSort = (selectedOption) => {
    this.setState({sort_value: selectedOption.label, sorttype: selectedOption.value})
  }

  handleChangeElement = (selectedOption) => {
    this.setState({element_value: selectedOption.label, element: selectedOption.value})
  }

  render(){
    const {profile, sorttype, element, sort_value, element_value} = this.state

    return(
      profile != null
      ? (<div className = 'user-info-container'>
          <div className = 'header-bar'>
            <img style = {{width:'50px',height:'50px'}}src = {profile.image} />
            <h1>{profile.username}</h1>
            <div className = 'flex-row-custom'>
              <Stars
                rating = {1}
                numberOfStars = {1}
                starRatedColor = "yellow"
                starDimension = "15px"
                starSpacing = "0px"
                />
              <h1>{profile.total_stars}</h1>
            </div>
          </div>
          <div className = 'user-sort-bar'>
            <div className = 'sort-container'>
              <h4 className = 'date-label'>Sort By:</h4>
              <Dropdown
                onChange= {this.handleChangeSort}
                options = {options}
                value={sort_value}
                clearable={false}
                placeholder = "Sort by"
                name='date-selecter'
                />
            </div>
            <div className = 'sort-container'>
              <h4 className = 'date-label'>Sort By:</h4>
              <Dropdown
                onChange= {this.handleChangeElement}
                options = {elementoptions}
                value={element_value}
                clearable={false}
                placeholder = "Element"
                name='element-selecter'
                />
            </div>
          </div>
          <UserElementsListing {...this.props} element = {element} sorttype = {sorttype} />
      </div>)
      : <Loading />
    )

  }
}

export default UserView
