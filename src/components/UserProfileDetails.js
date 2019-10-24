import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap';


const UserProfileDetails = (props) => {
    return (
        <Col sm={4} className="user-profile-column">
            <h3>You</h3>
            <div className="profile-image">
                {props.currentUser.image ? <img src={props.currentUser.image.url} alt=""></img> : <h2>No Image Found</h2>} 
            </div>

            <div className="profile-details">
                <h3>{props.currentUser.name}</h3>
                <p>Email: {props.currentUser.email}</p>
                <p>Age: {props.currentUser.age}</p>
                <p>Gender: {props.currentUser.gender[0].toUpperCase() + props.currentUser.gender.slice(1)}</p>
                <p>Zipcode: {props.currentUser.zipcode}</p>
                <label>Bio:</label>
                <p>{props.currentUser.bio}</p>

                <LinkContainer to="/editprofile">
                    <Button variant="primary">Edit Profile</Button>
                </LinkContainer>
            </div>

            <div className="profile-preferences">
                <h3>Your Match Preferences</h3>
                <p><strong>Age Range:</strong><br></br> 
                {props.currentUser.preference.min_age} to {props.currentUser.preference.max_age}</p>
                <label><strong>Pet Preferences:</strong></label>
                <ul className="profile-pets-pref-list">
                    {props.currentUser.preference.wants_dog ? <li>Dog</li> : null}
                    {props.currentUser.preference.wants_cat ? <li>Cat</li> : null}
                    {props.currentUser.preference.wants_bird ? <li>Bird</li> : null}
                    {props.currentUser.preference.wants_fish ? <li>Fish</li> : null}
                    {props.currentUser.preference.wants_reptile ? <li>Reptile</li> : null}
                    {props.currentUser.preference.wants_exotic ? <li>Exotic</li> : null}
                    {props.currentUser.preference.wants_rodent ? <li>Rodent</li> : null}
                </ul>
                <label><strong>Gender Preferences:</strong></label>
                <ul className="profile-gender-pref-list">
                    {props.currentUser.preference.wants_men ? <li>Men</li> : null}
                    {props.currentUser.preference.wants_women ? <li>Women</li> : null}
                    {props.currentUser.preference.wants_non_binary ? <li>Non-binary</li> : null}
                    {props.currentUser.preference.wants_other ? <li>Other</li> : null}
                </ul>

                <LinkContainer to="/preferences">
                    <Button variant="primary">Edit Preferences</Button>
                </LinkContainer>
            </div>
        </Col>
    );
}
 
export default UserProfileDetails;