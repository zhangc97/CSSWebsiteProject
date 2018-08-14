import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WebLogo from '../utils/WWW.png'
import githubLogo from '../utils/github.png'
import biographyLogo from '../utils/biography.png'
const url = 'http://127.0.0.1:8000/api'


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
          <div className = 'sidebar-container' style = {{backgroundColor: '#f4f5ff', marginTop:'50px', width:'250px'}}>
            <div className= 'user-display'>
              <h2 style ={{margin: '0', fontWeight: '400', marginBottom: '10px'}}>{profile.username}</h2>

              <img style = {{width:'200px',height:'200px',borderRadius: '200px'}} src = {url + profile.image} />
              <div className = 'flex-row-custom'>
                <FontAwesomeIcon
                  icon="star"
                  style = {{color: 'yellow', fontSize: '20px', marginRight: '10px' }}/>
                  <h1 style ={{margin: '0'}}>{profile.total_stars}</h1>
              </div>

              <div className = 'flex-row-simple' style ={{marginTop: '5px', }}>
                <img src = {WebLogo} style = {{height: '22px', width: '22px', position:'relative', left:'-3px', marginRight:'4px'}}></img>
                <a href= {profile.website} style ={{margin: '0',fontSize: '14px', fontWeight: '400', textDecoration: 'none', color:'grey'}}>Website</a>
              </div>
              <div className = 'flex-row-simple' style ={{marginTop: '5px', }}>
                <img src = {githubLogo} style = {{height: '24px', width: '24px', position:'relative', left:'-4px', marginRight:'3px'}}></img>
                <a href={profile.github} style ={{margin: '0',fontSize: '14px', fontWeight: '400', textDecoration: 'none', color:'grey'}}>Github</a>
              </div>
              <div className = 'flex-row-simple' style ={{marginTop: '5px', }}>
                <FontAwesomeIcon icon="envelope" style = {{color: 'black',marginRight:'9px',fontSize:'18px', position: 'relative', left:'-1px' }}/>
                <a style ={{margin: '0', fontSize: '14px',fontWeight: '400', textDecoration: 'none', color:'grey'}}>{profile.contact}</a>
              </div>
              <div className = 'flex-row-simple-wrap' style = {{marginTop: '5px'}}>
                <img src = {biographyLogo} style = {{height: '22px', width: '22px', position:'relative', left:'-3px', marginRight:'4px'}}></img>
                <p style ={{margin: '0', fontSize: '14px',fontWeight: '400', textDecoration: 'none', color:'grey', marginTop:'2px'}}>
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
