import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {displayCode} from '../utils/actions'
import ListingBlock from './ListingBlock'

class ElementsListing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fetching: false,
      data : this.props.data,
      pagenumber: this.props.pagenumber,
    }
    this.retrieveResults = this.retrieveResults.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.querySearch = this.querySearch.bind(this)
  }
  componentDidMount(){
    window.addEventListener('scroll', this.onScroll, false)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data
    })
  }

  onScroll(){
    const {sorttype, count, data, route} = this.props
    const {pagenumber} = this.state
    if ((window.scrollY) >= (this.infinitediv.clientHeight-900) && data.length && this.state.fetching == false && pagenumber<=count){
      this.retrieveResults(sorttype, route, pagenumber)
    }
  }

  retrieveResults(sorttype, route, currentpagenumber) {
    this.setState({fetching: true})
    setTimeout(this.querySearch(sorttype, route, currentpagenumber), 300)
  }

  querySearch(sorttype, route, currentpagenumber) {
    this.props.dispatch(displayCode(sorttype, route, currentpagenumber))
      .then(res => this.setState({data: this.state.data.concat(res.object.results), fetching: false, pagenumber: currentpagenumber +1}))
      .catch(err => console.log('Error: ', err))
  }

//this.setState({data: this.state.data.concat(res.object.results), fetching: false, pagenumber: pagenumber+1 })
  render() {
    const {fetching, data} = this.state
    return(
      <React.Fragment>
        <div className = 'listing-container' ref={ (infinitediv) => this.infinitediv = infinitediv}>
          { data.map((result,id) => (
                <ListingBlock result ={result} key = {id} {...this.props}/>
            ))
          }
          </div>
          {fetching
            ?<h1>Loading</h1>
            : null}

      </React.Fragment>
    )
  }
}

export default ElementsListing
