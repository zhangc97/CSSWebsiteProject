import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WebLogo from '../utils/WWW.png'
import githubLogo from '../utils/github.png'
import biographyLogo from '../utils/biography.png'
import {host} from '../utils/host'
const url = host


class UserSideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      profile: null,
    }
  }

  componentDidMount(){
    this.setState({profile: this.props.profile})
  }
  render(){
    const {profile} = this.state
    console.log(profile)
    return(
      profile
        ? (
          <div className = 'sidebar-container' style = {{color: '#f5f5f5f0', marginTop:'50px', width:'250px'}}>
            <div className= 'user-display'>
              <h2 style ={{margin: '0', fontWeight: '400', marginBottom: '10px'}}>{profile.username}</h2>

              <img style = {{width:'200px',height:'200px',borderRadius: '200px'}} src = {url + profile.image} />
              <div className = 'flex-row-custom'>
                <FontAwesomeIcon
                  icon="star"
                  style = {{color: 'yellow', fontSize: '24px', marginRight: '5px' }}/>
                  <h1 style ={{margin: '0', fontWeight: '400'}}>{profile.total_stars}</h1>
              </div>

              <div className = 'sidebar-list-items' >
                <img src = {WebLogo} style = {{height: '22px', width: '22px', position:'relative',marginLeft:'5px', marginRight:'4px'}}></img>
                <a href= {profile.website} style ={{margin: '0',fontSize: '14px', fontWeight: '400', textDecoration: 'none', color: '#040404b5'}}>{profile.website}</a>
              </div>
              <div className = 'sidebar-list-items'>
                <img src = {githubLogo} style = {{height: '24px', width: '24px', position:'relative', marginLeft: '4px', marginRight:'3px'}}></img>
                <a href={profile.github} style ={{margin: '0',fontSize: '14px', fontWeight: '400', textDecoration: 'none', color: '#040404b5'}}>{profile.github}</a>
              </div>
              <div className = 'sidebar-list-items'>
                <FontAwesomeIcon icon="envelope" style = {{color: 'black', marginLeft: '6px', marginRight:'7px',fontSize:'18px', position: 'relative' }}/>
                <a style ={{margin: '0', fontSize: '14px',fontWeight: '400', textDecoration: 'none',color: '#040404b5'}}>{profile.contact}</a>
              </div>
              <div className = 'flex-row-simple-wrap' style = {{marginTop: '5px',  width: '218px', backgroundColor:'#ffeeee', boxShadow: '2px 2px 2px grey', borderRadius: '10px', padding: '6px'}}>
                <img src = {biographyLogo} style = {{height: '22px', width: '22px', position:'relative', left:'-3px', marginRight:'4px'}}></img>
                <p style ={{margin: '0', fontSize: '14px',fontWeight: '400', textDecoration: 'none', marginTop:'2px', color: '#040404b5'}}>
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>
        )
        : null

    )
  }
}

export default UserSideBar
