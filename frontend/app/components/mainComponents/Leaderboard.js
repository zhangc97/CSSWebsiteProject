import React from 'react'
import {fetch_leaderboard} from '../utils/api'
import Stars from 'react-star-ratings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {host} from '../utils/host'

const server_url = host
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
            <React.Fragment key = {id}>
            <div style = {{marginTop: '2px', }} className= 'leaderboard-listing'>
              <div style = {{marginRight: '10px', backgroundColor: 'transparent', height: '50px', width:'50px'}}>
                <img src = {server_url + player.image} style = {{height: '50px', width: '50px', borderRadius : '50px', opacity:'0.99'}}></img>
              </div>

              <div style = {{width: '70%', justifyContent: 'space-around', alignItems: 'flex-start'}} className = 'flex-column'>
                <div className = 'flex-row-simple-wrap' style = {{alignItems: 'baseline'}}>
                  <span style = {{color: 'black', fontSize: '20px', fontWeight: '500', marginRight: '5px'}}>
                    {i + '.'}
                  </span>
                  <span style = {{color: 'grey'}}>
                  {player.username}
                  </span>

                </div>
                <Star_bar width = {bar_size} />
              </div>
              <div style = {{marginLeft: '30px', height: '60px'}} className = 'flex-row-custom' >
                <FontAwesomeIcon
                  icon="star"
                  style = {{color: 'yellow', fontSize: '20px', marginRight: '3px' }}/>
                  <h1 style ={{fontSize: '20px',margin: '0', fontWeight: '400', color:'grey'}}>{player.total_stars}</h1>
              </div>
            </div>
            <div style = {{width: '90%', height:'1px', position:'relative', backgroundColor:'#a9a9a9', left:'2.5%', marginBottom: '5px', marginTop:'5px'}}>

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
  <div style = {{width:'100%', height: '3px', backgroundColor:'#dcdcdc', borderRadius: '3px'}}>
    <div style = {star_bar_style}>
    </div>
  </div>)
}

export default Leaderboard
