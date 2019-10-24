import React from 'react';
import PetCard from './PetCard';
import Col from 'react-bootstrap/Col'

const PetsList = (props) => {
    return (
        <Col sm={4} className="profile-pets-list">
            <h3>Your Pets</h3>
            {props.pets.map( (pet, index) => <PetCard pet={pet} key={index} />)}
        </Col>
    );
}
 
export default PetsList;