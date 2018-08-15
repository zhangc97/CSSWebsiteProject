import React from 'react'
import NavDesktop from '../Nav'
import CreationSection from './addToDatabaseComponents/CreationSection'
import {sendCode} from '../utils/actions'
import CreateSideBar from './CreateSideBar'

class Createview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      layoutMode: this.getLayoutMode()
    }
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
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
  render() {
    const {dispatch, isAuthenticated, errorMessage} = this.props
    return(
      <React.Fragment>
        <CreateSideBar />
          <CreationSection {...this.props} onSubmitClick={ (e,data) => this.props.dispatch(sendCode(e,data)) }/>
      </React.Fragment>
    )
  }
}

export default Createview
