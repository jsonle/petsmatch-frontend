import React from 'react';
import PetsList from './PetsList'
// import Match from '../../public/public/match-fire-pngrepo-com.png'


const UserStats = (props) => {

    console.log(props.isMatchedWithDisplayed)
    return ( 
        <div className='clearfix w-75 float-right pt-3 pl-3 pr-3'>
            {props.renderMatchImage()}
            <img src={props.displayedUser.image.url}></img>
            <h1>{props.displayedUser.name}</h1>
            <h3>{props.displayedUser.age}</h3>
            <p>{props.displayedUser.bio}</p>
            <div id='pet-card-container'>
                <div id='pet-card-inner'>
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
        </div>
     );
}
 
export default UserStats;