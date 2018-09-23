import React from 'react'
import NavDesktop from '../Nav'
import CreationSection from './addToDatabaseComponents/CreationSection'
import {sendCode} from '../utils/actions'
import CreateSideBar from './CreateSideBar'
import {button_template, table_template, list_template, text_template, select_template, form_template,link_template} from './addToDatabaseComponents/utils/variables'

class Createview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      layoutMode: this.getLayoutMode(),
      template: ''
    }
    this.onResize = this.onResize.bind(this)
    this.onTemplateClick = this.onTemplateClick.bind(this)
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


  onTemplateClick = (e, template) => {
    switch (template) {
      case 'button':
        this.setState({template: button_template})
        break;
      case 'table':
        this.setState({template: table_template})
        break;
      case 'list':
        this.setState({template: list_template})
        break;
      case 'link':
        this.setState({template: link_template})
        break;
      case 'text':
        this.setState({template: text_template})
        break;
      case 'select':
        this.setState({template: select_template})
        break;
      case 'form':
        this.setState({template: form_template})
        break;

    }
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
        <CreateSideBar
          onTemplateClick = {this.onTemplateClick}
        />
          <CreationSection {...this.props} onSubmitClick={ (e,data) => this.props.dispatch(sendCode(e,data)) } template = {this.state.template}/>
      </React.Fragment>
    )
  }
}

export default Createview
