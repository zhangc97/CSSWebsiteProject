import React from 'react'
import {fetch_profile, update_profile} from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import Loading from '../mainComponents/Loading'
const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})
import {host} from '../utils/host'
const url = host;

class Account extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      edit_mode: false,
      user: {},
      name: '',
      contact: '',
      website: '',
      github: '',
      bio: '',
      error: '',
      image: null,
    }
  }
  componentDidMount(){
    const token = localStorage.token
    console.log(token)
    fetch_profile(token)
      .then(user=> this.setState(user))
      .catch(err => console.log('Error: ', err))
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { bio, contact, github, name, website, image} = this.state
    if (!(contact.includes('@')) && contact.length > 3) {
      this.setState({error: 'Please enter a valid email'})
    } else if(!(github.includes('github')) && github.length > 2){
      this.setState({error: 'Please enter a valid github link'})
    } else {
      var formData = new FormData()
      if(bio.length > 1){
        formData.append('bio',bio)
      }
      if (contact.length>1){
        formData.append('contact', contact)
      }
      if(name.length>1){
        formData.append('name', name)
      }
      if(website.length>1){
        formData.append('website', website)
      }
      if (image) {
        formData.append('image', image)
      }//Change all this to a map please in the future
      if(update_profile(formData)){
        this.setState({
          error: 'Updated'
        })
        window.location.reload()
      } else {
        this.setState({
          error: 'Error, please try again'
        })
      }
    }
  }

  onDrop = (files) => {
    this.setState({
      image:files[0]
    })
  }
  render() {

    const { edit_mode, user, name, contact, image, website, github, bio, error} = this.state

    return(
      user.profile
        ? !edit_mode
          ? (
          <div className = 'account-container'>
            <img src = {url + user.profile.image} style = {{marginBottom: '5px', width: '200px', height: '200px', borderRadius: '200px', border: '2px black solid'}}></img>
            <div style= {{borderBottom: '0.25px #cacaca solid', width:'100%', height:'1px'}} />
            <div className = 'account-info'>
              <al>
                <ac>Name:</ac>
              </al>
              <span className = 'account-listing'>{user.profile.name}</span>
              <al>
                <ac>Contact Email:</ac>
              </al>
              <span className = 'account-listing'>{user.profile.contact}</span>
              <al>
                <ac>Website:</ac>
              </al>
              <span className = 'account-listing'>{user.profile.website}</span>
              <al>
                <ac>Github:</ac>
              </al>
              <span className = 'account-listing'>{user.profile.github}</span>
              <al>
                <ac>Bio:</ac>
              </al>
              <textarea className ='boxsizingBorder' readOnly defaultValue = {user.profile.bio}>
              </textarea>
          </div>
            <FontAwesomeIcon icon = "edit" style = {{position: 'absolute', top: '5', right: '5', fontSize: '20px', cursor: 'pointer'}} onClick = {()=>this.setState({edit_mode: !edit_mode})}/>
          </div>
        )
        : (
          <div className = 'account-container'>
            <div className = 'dropzone' style = {{width: '200px', height: '200px', marginBottom: '10px', cursor: 'pointer',}}>
              <Dropzone
                onDrop ={this.onDrop}
                style = {{
                  width: '200px',
                  height: '200px',
                  borderWidth: '2px',
                  borderColor: 'rgb(102, 102, 102)',
                  borderStyle: 'dashed',
                  borderRadius: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                {image!=null ? <img src = {image.preview} style = {{width: '100%', height: '100%'}}></img> : <FontAwesomeIcon icon = "cloud-upload-alt" style ={{ fontSize: '60px', left: '25px', top: '25px'}}/>}
              </Dropzone>
            </div>
            <div style= {{borderBottom: '0.25px #cacaca solid', width:'100%', height:'1px'}} />
            <form onSubmit = {this.onSubmit} className = 'account-container'>
              <al>
                <ac>Name:</ac>
              </al>
                <input
                  value = {name}
                  onChange = {event => this.setState(byPropKey('name', event.target.value))}
                  type = 'text'
                  placeholder = {user.profile.name}
                  className = 'account-input-style'
                  id = 'name'
                />
              <al>
                <ac>Contact Email:</ac>
              </al>
                <input
                  value = {contact}
                  onChange = {event => this.setState(byPropKey('contact', event.target.value))}
                  type = 'text'
                  placeholder = {user.profile.contact}
                  className = 'account-input-style'
                  id = 'contact'
                />
              <al>
                <ac>Website:</ac>
              </al>
                <input
                  value = {website}
                  onChange = {event => this.setState(byPropKey('website', event.target.value))}
                  type = 'text'
                  placeholder = {user.profile.website}
                  className = 'account-input-style'
                  id = 'website'
                />
              <al>
                <ac>Github:</ac>
              </al>
              <input
                value = {github}
                onChange = {event => this.setState(byPropKey('github', event.target.value))}
                type = 'text'
                placeholder = {user.profile.github}
                className = 'account-input-style'
                id = 'github'
              />
              <al style = {{display: 'flex', justifyContent:'space-between'}}>
                <ac>Bio:</ac>
                <span style = {{marginTop:'10px', position:'relative', fontSize: '9px'}}>{bio.length > 1 ? 500 -bio.length : 500 - user.profile.bio.length} Characters Remaining</span>

              </al>
              <textarea
                className ='boxsizingBorder'
                maxLength = '500'
                onChange = {event => this.setState(byPropKey('bio', event.target.value))}
                defaultValue = {user.profile.bio}
                id = 'bio'
              ></textarea>
              <button type = 'submit' className = 'btn'>
                Submit
              </button>
            </form>
            {error ? error : null}
          </div>
        )
        : <Loading />
    )
  }
}

export default Account
