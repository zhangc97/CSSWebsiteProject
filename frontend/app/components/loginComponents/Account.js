import React from 'react'
import {fetch_profile, update_profile} from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})

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
    const { bio, contact, github, name, website} = this.state
    if (!(contact.includes('@')) && contact.length > 3) {
      this.setState({error: 'Please enter a valid email'})
    } else if(!(github.includes('github'))){
      this.setState({error: 'Please enter a valid github link'})
    } else {
      const {data} = {bio, contact, github, name, website}
    }

    update_profile(data)
      .then
      //trouble shoot and debug this

    console.log(this.state)
  }
  render() {

    const {edit_mode, user, name, contact, image, website, github, bio} = this.state
    return(
      user.profile && !edit_mode
        ? (
          <div className = 'account-container'>
            <img src = {user.profile.image} style = {{marginBottom: '5px'}}></img>
            <div style= {{borderBottom: '0.25px #cacaca solid', width:'100%', height:'1px'}} />
            <al>
              <ac>Name:</ac>
            </al>
            <p>{user.profile.name}</p>
            <al>
              <ac>Contact Email:</ac>
            </al>
            <p>{user.profile.contact}</p>
            <al>
              <ac>Website:</ac>
            </al>
            <p>{user.profile.website}</p>
            <al>
              <ac>Github:</ac>
            </al>
            <p>{user.profile.github}</p>
            <al>
              <ac>Bio:</ac>
            </al>
            <textarea className ='boxsizingBorder'>
              {user.profile.bio}
            </textarea>
            <FontAwesomeIcon icon = "edit" style = {{position: 'absolute', top: '5', right: '5', fontSize: '20px', cursor: 'pointer'}} onClick = {()=>this.setState({edit_mode: !edit_mode})}/>
          </div>
        )
        : (
          <div className = 'account-container'>
            <img src = {null} style = {{marginBottom: '5px'}}></img>
            <div>Upload</div>
            <div style= {{borderBottom: '0.25px #cacaca solid', width:'100%', height:'1px'}} />
            <form onSubmit = {this.onSubmit} className = 'account-container'>
              <al>
                <ac>Name:</ac>
              </al>
                <input
                  value = {name}
                  onChange = {event => this.setState(byPropKey('name', event.target.value))}
                  type = 'text'
                  placeholder = 'Name'
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
                  placeholder = 'Contact'
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
                  placeholder = 'Website'
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
                placeholder = 'Github'
                className = 'account-input-style'
                id = 'github'
              />
              <al>
                <ac>Bio:</ac>
              </al>
              <textarea
                value = {bio}
                className ='boxsizingBorder'
                onChange = {event => this.setState(byPropKey('bio', event.target.value))}
                placeholder = 'Bio'
                id = 'bio'
              ></textarea>
              <button type = 'submit'>
                Submit
              </button>
            </form>
            {error ? error : null}
          </div>
        )
    )
  }
}

export default Account
