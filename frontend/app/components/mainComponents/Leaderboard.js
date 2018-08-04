import React from 'react'
import {fetch_leaderboard} from '../utils/api'
import Stars from 'react-star-ratings'
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
    return(
      data
      ? (<table>
          <tbody>
            <tr>
            <td colSpan='2'>Leaderboard</td>
          </tr>
            {data.map((data,id) => (
              <tr key = {id}>
                <th>{data.username}</th>
                <th><Stars
                rating = {1}
                numberOfStars = {1}
                starRatedColor = "yellow"
                starDimension = "15px"
                starSpacing = "0px"
                />{data.total_stars}</th>
              </tr>
            ))}
        </tbody>
      </table>)
      :null
    )
  }
}

export default Leaderboard
