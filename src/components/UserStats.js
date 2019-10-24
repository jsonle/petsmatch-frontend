import React from 'react';
import PetsList from './PetsList'

const UserStats = (props) => {
    return ( 
        <div className='clearfix w-75 float-right pt-3 pl-3 pr-3'>
            {props.renderMatchImage()}
            <img src={props.displayedUser.image.url}></img>
            <h1>{props.displayedUser.name}</h1>
            <h3>{props.displayedUser.age} - {props.displayedUser.gender}</h3>
            <p>{props.displayedUser.bio}</p>
            {console.log(props.displayedUser.preference)}
            <div id='pet-card-container'>
                <div id='pet-card-inner'>
                    {props.displayedUser.pets.map( (pet, index) => {
                        return (
                            <div key={index} className='pet-card w-10'>
                                <img className='w-100' src={pet.image.url}></img>
                                <p>{pet.name}</p>
                                <p>{pet.pet_type}</p>
                                <p>{pet.category}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default UserStats;