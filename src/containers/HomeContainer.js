import React, { Component } from 'react';
import MatchList from '../components/MatchList'
import UserStats from '../components/UserStats'

class HomeContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <img className='home-image' src={process.env.PUBLIC_URL + '/Pug-infographic.png'}></img>
                <img className='home-image' src={process.env.PUBLIC_URL + '/match-fire-pngrepo-com.png'}></img>
                <img className='w-50' id='logo' src={process.env.PUBLIC_URL + '/petsmatch-logo.png'}></img>



            </div>
         );
    }
}
 
export default HomeContainer;