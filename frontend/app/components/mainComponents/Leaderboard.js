import React from 'react'
import {fetch_leaderboard} from '../utils/api'
import Stars from 'react-star-ratings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const server_url = "http://127.0.0.1:8000/api"
var top_score = 100;

class Leaderboard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      object: {}
    }
  }
  componentDidMount(){
    fetch_leaderboard()
      .then(result => this.setState(result))
      .catch(err => console.log('Error :', err))
  }
  render(){

    const data = this.state.object.results
    let top_score_trigger = false;
    if (data){
      top_score = data[0].total_stars;
      top_score_trigger = true;
    }

    let i = 0;
    return(
      data
      ? (<div className= 'leaderboard-container'>
        {data.map((player, id) => {
          i++;
          let player_score = player.total_stars
          let bar_size = '100%'
          if (player_score == 0 ){
            bar_size = '1%'
          } else {
            let bar_size_calc = top_score/player_score * 100
            bar_size = `${bar_size_calc}%`
          }
          return (
            <React.Fragment>
            <div key = {id} style = {{marginTop: '2px', }} className= 'leaderboard-listing'>
              <div style = {{marginRight: '10px', backgroundColor: 'transparent', height: '50px', width:'50px'}}>
                <img src = {server_url + player.image} style = {{height: '50px', width: '50px', borderRadius : '50px', opacity:'0.99'}}></img>
              </div>

              <div style = {{width: '70%', justifyContent: 'space-around', alignItems: 'flex-start'}} className = 'flex-column'>
                {i + '.  ' + player.username}
                <Star_bar width = {bar_size} />
              </div>
              <div style = {{marginLeft: '30px', height: '60px'}} className = 'flex-row-custom' >
                <FontAwesomeIcon
                  icon="star"
                  style = {{color: 'yellow', fontSize: '20px', marginRight: '3px' }}/>
                  <h1 style ={{fontSize: '20px',margin: '0', fontWeight: '400'}}>{player.total_stars}</h1>
              </div>
            </div>
            <div style = {{width: '90%', height:'1px', position:'relative', backgroundColor:'#a9a9a9', left:'5%', marginBottom: '5px', marginTop:'5px'}}>

            </div>
          </React.Fragment>
          )
        })}
      </div>)
      :null
    )
  }
}


const Star_bar = (width) => {

  const star_bar_style = {
    position: 'relative',
    width: width.width,
    height: '3px',
    borderRadius: '3px',
    backgroundImage: 'linear-gradient(to right,#dcdcdc,#e45252)'
  }
  return (
  <div style = {{width:'100%', height: '3px', backgroundColor:'#f7f7f7', borderRadius: '3px'}}>
    <div style = {star_bar_style}>
    </div>
  </div>)
}

export default Leaderboard
