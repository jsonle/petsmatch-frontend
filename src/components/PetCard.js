import React from 'react';

const PetCard = ( {pet} ) => {
    return (
        <div className='pet-card w-10'>
            <img className='w-100' src={pet.image.url}></img>
            <h4>{pet.name}</h4>
            <p>{pet.category}</p>
            <p>{pet.pet_type}</p>
            <p>Age: {pet.age}</p>
        </div>
    );
}
 
export default PetCard;