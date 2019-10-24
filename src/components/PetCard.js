import React from 'react';
import Card from 'react-bootstrap/Card'

const PetCard = ( {pet} ) => {
    return (
        <Card className='pet-card w-10'>
            <Card.Img variant="top" className='w-100' src={pet.image.url}/>
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                {pet.category}<br></br>
                {pet.pet_type}<br></br>
                Age: {pet.age}<br></br>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
 
export default PetCard;