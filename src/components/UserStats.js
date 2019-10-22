import React from 'react';
import PetsList from './PetsList'

const UserStats = (props) => {
    console.log('props', props)
    return ( 
        <div>
            <h1>{props.displayedUser.name}</h1>
            <h3>{props.displayedUser.age}</h3>
            <p>{props.displayedUser.bio}</p>
            {props.displayedPets.map( (pet, index) => {
                return (
                    <div className='pet-card w-10'>
                        <img className='w-100' src={pet.image.url}></img>
                        <p>{pet.name}</p>
                    </div>
                )
            })}
        </div>
     );
}
 
export default UserStats;