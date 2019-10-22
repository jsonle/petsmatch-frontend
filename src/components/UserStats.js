import React from 'react';
import PetsList from './PetsList'
// import Match from '../../public/public/match-fire-pngrepo-com.png'

const UserStats = (props) => {
    return ( 
        <div className='clearfix w-75 float-right pt-3 pl-3 pr-3'>
            <img id='match-button' onClick={ (e) => props.handleMatchClick(e, props.displayedUser.id)} src={process.env.PUBLIC_URL + '/match-fire-pngrepo-com.png'}></img>
            <img src={props.displayedUser.image.url}></img>
            <h1>{props.displayedUser.name}</h1>
            <h3>{props.displayedUser.age}</h3>
            <p>{props.displayedUser.bio}</p>
            <div id='pet-card-container'>
                {props.displayedPets.map( (pet, index) => {
                    return (
                        <div className='pet-card w-10'>
                            <img className='w-100' src={pet.image.url}></img>
                            <p>{pet.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default UserStats;