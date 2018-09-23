import React from 'react'
class CreateSideBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      template: ''
    }
  }

  render() {
    return(
      <div className= 'sidebar-container' style = {{color : '#040404b5'}}>
        <div
          className = 'sidebar-list-items'
          style = {{marginTop: '90px', justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'button')}>
            <p>Button Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'table')}>
            <p>Table Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e , 'list')}>
            <p>List Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'link')}>
            <p>Link Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'text')}>
            <p>Text Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'select')}>
            <p>Select Template</p>
        </div>
        <div
          className = 'sidebar-list-items'
          style = {{justifyContent:'center', cursor:'pointer'}}
          onClick = {(e)=>this.props.onTemplateClick(e, 'form')}>
            <p>Form Template</p>
        </div>
      </div>
    )
  }
}

export default CreateSideBar
