import React from 'react'
import AceEditor from 'react-ace'
import Dropdown from 'react-dropdown'
import '../componentStyling/dropdown.css'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
import {options, base_tpl} from './utils/variables'
const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})

const selectStyles = {
  control: () => ({
    width: 200,
  })
}


class CreationSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: localStorage.user,
      title: '',
      element: '',
      comments: '',
      html_value: '',
      css_value: '',
    }

    this.onChangeHTML = this.onChangeHTML.bind(this)
    this.onChangeCSS = this.onChangeCSS.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.prepareSource = this.prepareSource.bind(this)
    this.renderSource = this.renderSource.bind(this)
  }

  componentDidMount() {
    this.renderSource();
    console.log(this.props)
  }
  componentDidUpdate() {
    this.renderSource();
  }

  prepareSource = (html_value, css_value) => {
    var src = ''
    var css
    //html
    src = base_tpl.replace('</body>', html_value + '</body>')
    //css
    css = '<style>' + css_value + '</style>'
    src = src.replace('</head>', css + '</head>')
    return src
  }

  renderSource(){
    var doc = this.prepareSource(this.state.html_value, this.state.css_value)
    const iframe = this.refs.iframe
    const iframeContent = iframe.contentDocument;

    iframeContent.open()
    iframeContent.write(doc)
    iframeContent.close()
  }

  onChangeHTML = (newValue) => {
    //console.log('change', newValue)
    this.setState({
      html_value: newValue
    })

    this.renderSource()
  }
  onChangeCSS = (newValue) => {
    //console.log('change', newValue)
    this.setState({
      css_value: newValue
    })

    this.renderSource()
  }

  onClick = () => {
    console.log('clicked')
  }

  onSubmit = (e) => {
    //add API call
    e.preventDefault()
    const parsedCode = this.prepareSource(this.state.html_value, this.state.css_value)
    const {title, element,  user, html_value, css_value} = this.state
    const data = { user, title, element, parsedCode, html_value, css_value}
    console.log(this.props)
    if (data.title.length < 1 ) {
      this.setState({error: 'Please create a title'})
    } else if (data.element.length < 1) {
      this.setState({error: 'Please select an element'})
    } else if (data.parsedCode.length < 1) {
      this.setState({error: 'Please enter code'})
    } else if (data.html_value.length < 1) {
      this.setState({error: 'Please enter HTML code'})
    } else {
      this.props.onSubmitClick(e,data).then(res =>{
        if(res){
          this.props.history.push('/')
        }
      })
    }

  }
  handleChange = (selectedOption) => {
    this.setState({
      element: selectedOption.value
    })
  }
  render(){
    //console.log(this.state)
    const {title, element, comments, error} = this.state
    return(
      <div className = 'editor-container'>
        <span className = 'error-span'>{error ? error : null}</span>
        <form onSubmit = {(e) => this.onSubmit(e)}  className = 'creation-form' >
          <div className = 'flex-row'>
            <input
              value = {title}
              onChange = {event => this.setState(byPropKey('title', event.target.value))}
              type= 'text'
              placeholder = 'Title'
              className = 'input-style'
            />
              <Dropdown
                onChange = {this.handleChange}
                options = {options}
                value = {element}
                clearable={false}
                placeholder = 'Element'
                name = 'element-selecter'
              />
            <button className = 'form-btn' type='submit'> Submit </button>
          </div>
        </form>
        <div className = 'iframe-display'>
          <iframe ref = 'iframe' className='iframe-display' frameBorder = 'no'></iframe>
        </div>

        <div className = 'editor-container-expanded-creation'>
          <div className = 'editor-expanded' onClick = {this.onClick}>
            <AceEditor
                mode="html"
                theme="monokai"
                name="blah2"
                width = "100%"
                height = "100%"
                onChange={this.onChangeHTML}
                value = {this.state.html_value}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{$blockScrolling: true}}
                setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 1,
                }}/>
          </div>
          <div style = {{height: '100%', width: '1%', borderTop: '0.15px #cacaca50 solid'}} />
          <div className = 'editor-expanded'>
            <AceEditor
                mode="css"
                theme="monokai"
                name="blah2"
                width = "100%"
                height = "100%"
                onChange={this.onChangeCSS}
                value = {this.state.css_value}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{$blockScrolling: true}}
                setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 1,
                }}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CreationSection
