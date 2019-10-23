import React from 'react';

const MatchedUserCard = (props) => {
    console.log('matchedusercard props', props)
    return ( 
        <div className='match-card'>
            <img src={props.match.user_two.image.url}></img>
            <h1>{props.match.user_two.name}</h1>
            <h3>{props.match.user_two.age}</h3>
            <p>{props.match.user_two.bio}</p>
            <div id='pet-card-container'>
                <div id='pet-card-inner'>
                    {props.match.user_two.pets.map( (pet, index) => {
                        return (
                            <div key={index} className='pet-card w-10'>
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
 
export default MatchedUserCard;