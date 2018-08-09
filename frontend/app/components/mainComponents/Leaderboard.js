import React from 'react'
import {fetch_leaderboard} from '../utils/api'
import Stars from 'react-star-ratings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const server_url = "http://127.0.0.1:8000/api"

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
    console.log(data)
    return(
      data
      ? (<table style = {{marginTop: '130px'}}>
          <tbody>
            <tr style = {{justifyContent: 'center'}}>
            <th>Leaderboard</th>
          </tr>
            {data.map((data,id) => (
              <tr key = {id}>
                <th>
                  <img src = {server_url+data.image} style = {{width:'25px', height: '25px', borderRadius: '25px', marginRight: '5px'}}></img>
                  {data.username}
                </th>
                <th>
                  <FontAwesomeIcon
                    icon="star"
                    style = {{color: 'yellow', fontSize: '14px' }}/>
                  {data.total_stars}
                </th>
              </tr>
            ))}
        </tbody>
      </table>)
      :null
    )
  }
}

export default Leaderboard
