import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
import {options, base_tpl} from './addToDatabaseComponents/utils/variables'
import {get_code} from '../utils/api'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withRouter} from 'react-router-dom'


const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})

class PostView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      html_value: '',
      css_value: 'body { background-color: white }',
    }
    this.prepareSource = this.prepareSource.bind(this)
    this.renderSource = this.renderSource.bind(this)
    this.onChangeHTML = this.onChangeHTML.bind(this)
    this.onChangeCSS = this.onChangeCSS.bind(this)
  }

  componentDidMount() {
    const post_id = this.props.match.params.post_id
    get_code(post_id)
      .then(res => this.setState({html_value: res.object.results[0].HTMLCode, css_value: res.object.results[0].CSSCode}))
      .then(this.renderSource())
      .catch(err => console.log('Error :', err))
  }

  componentDidUpdate(){
    this.renderSource()
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

  render(){

    return(

      <div className = 'editor-container'>
          <div style ={{height: '50px', display:'flex', alignItems: 'center'}}>
            <FontAwesomeIcon className = 'hover-pointer' icon="home" style = {{fontSize: '32px', color: 'white'}} onClick = {()=>(this.props.history.push('/'))}/>

          </div>

          <iframe ref = 'iframe' className='iframe-display' frameBorder = 'no'></iframe>
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

export default withRouter(PostView)
