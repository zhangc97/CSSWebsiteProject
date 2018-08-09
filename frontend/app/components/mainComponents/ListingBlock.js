import React from 'react'
import AceEditor from 'react-ace'
import {options, base_tpl} from './addToDatabaseComponents/utils/variables'
import Stars from 'react-star-ratings'
import {handle_stars} from '../utils/api'
import {withRouter, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import expandimage from '../utils/expand.png'

class ListingBlock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      expand: false,
      html_value: '',
      css_value: '',
      rating: 0,
      expanded_height: 0,

    }
    this.prepareSource = this.prepareSource.bind(this)
    this.renderSource = this.renderSource.bind(this)
    this.onChangeHTML = this.onChangeHTML.bind(this)
    this.onChangeCSS = this.onChangeCSS.bind(this)
    this.onRatingChange = this.onRatingChange.bind(this)
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

  componentDidMount(){
    var {result} = this.props
    this.setState({
      html_value: result.HTMLCode,
      css_value: result.CSSCode
    })


  }

  componentDidUpdate(){
    if(this.state.expand == true){
      this.renderSource()
    } //put this in an onclick so it doesnt crash when clicked

  }



  onClick = () => {
    const iframe = this.refs.iframe
    console.log('clicked')
    const {expand} = this.state
    this.setState({
      expand: !expand,
    })

  }
  onLoad = () => {
      const minimize_button = this.refs.minimize
      if(minimize_button) {
        console.log('here')
        //window.scrollTo(0,minimize_button.offsetTop)
      }
  }
  renderSource = () => {
    var doc = this.prepareSource(this.state.html_value, this.state.css_value)
    const iframe = this.refs.iframe
    const iframeContent = iframe.contentDocument
    if (iframe){
      iframeContent.open()
      iframeContent.write(doc)
      iframeContent.close()
    }

  }

  onChangeHTML = (newValue) => {
    this.setState({
      html_value: newValue
    })
    this.renderSource()
  }


  onChangeCSS = (newValue) => {
    this.setState({
      css_value: newValue
    })
    this.renderSource()
  }

  onRatingChange = (newRating, name) => {
    const {result, isAuthenticated} = this.props
    const fiddle_id = result.post_id
    const data = {fiddle_id: fiddle_id,stars: newRating}
    if(!isAuthenticated){
      this.props.history.push('/signin')
    } else {
      this.setState({
        rating: newRating
      })
      handle_stars(data)
    }
    //add votes to server model
  }

  render(){
    const {expand, rating} = this.state
    const {result} = this.props
    const stars = result.stars
    return(
      <React.Fragment>
        { !expand
          ? (<div className='info-container'>
              <div className = 'info-info-container-top'>
                <div style = {{marginLeft: '10px'}}>
                  <FontAwesomeIcon icon="user" style = {{color: 'white', }}/>
                  <Link to = {`/users/${result.user}`} className = 'info-container-link'>{result.user}</Link>
                </div>
                <div className = 'flex-row-custom' style ={{position: 'absolute', right: '0%'}}>
                  <FontAwesomeIcon icon="star" style = {{color: 'yellow', fontSize: '14px' }}/>
                  <p style = {{color: '#f7f7f7'}}>{stars}</p>
                </div>
              </div>
              <div className = 'info-display-container' >
                <iframe className="info-display-container" frameBorder ="no" scrolling = "no" src = {`http://127.0.0.1:8000/api/fiddles/${result.post_id}/`} />
              </div>
              <div className = 'info-click-overlay' onClick={this.onClick}></div>
              <div className = 'info-info-container-bottom'>
                <Stars
                  rating = {rating}
                  starRatedColor = "yellow"
                  starHoverColor = "yellow"
                  changeRating = {rating == 0 ? this.onRatingChange: null}
                  numberOfStars = {5}
                  name = 'rating'
                  starDimension = "15px"
                  starSpacing = "0px"
                />


              </div>
            </div>)
          : (<div className = 'info-container-expanded' onLoad = {this.onLoad}>
            <div className = 'info-info-container-top'>
                <div style = {{marginLeft: '10px'}}>
                  <FontAwesomeIcon icon="user" style = {{color: 'white'}}/>
                  <Link to = {`/users/${result.user}`} className = 'info-container-link'>{result.user}</Link>
                </div>

                <div className='info-btn' onClick = {this.onClick}>Minimize</div>
                <div className = 'flex-row-custom'>
                  <FontAwesomeIcon icon="star" style = {{color: 'yellow', fontSize: '14px' }}/>
                  <p style = {{color: '#f7f7f7'}}>{stars}</p>
                </div>
              </div>
              <div className = 'iframe-display'>
                <iframe ref = 'iframe' scrolling = 'no' frameBorder ="no" className = 'iframe-display' key = {result.post_id}/>
              </div>
              <div className = 'editor-container-expanded'>
                <div className ='editor-expanded'>
                  <AceEditor
                    mode = "html"
                    value = {this.state.html_value}
                    onChange = {this.onChangeHTML}
                    theme="monokai"
                    name="blah2"
                    width = "100%"
                    height = "100%"
                    fontSize={12}
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
                  }} />

                </div>
                <div style = {{height: '100%', width: '1%'}}/>
                <div className ='editor-expanded'>
                  <AceEditor
                    mode = "css"
                    value = {this.state.css_value}
                    onChange = {this.onChangeCSS}
                    theme="monokai"
                    name="blah2"
                    width = "100%"
                    height = "100%"
                    fontSize={12}
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
                  }} />
                </div>
              </div>

            </div>)
        }

      </React.Fragment>
    )
  }
}

export default withRouter(ListingBlock)
