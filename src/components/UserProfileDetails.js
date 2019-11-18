import React from 'react';
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
                <strong>Email: </strong>{props.currentUser.email}<br></br>
                <strong>Age: </strong>{props.currentUser.age}<br></br>
                <strong>Gender: </strong>{props.currentUser.gender[0].toUpperCase() + props.currentUser.gender.slice(1)}<br></br>
                <strong>Zipcode: </strong>{props.currentUser.zipcode}<br></br>
                <strong id="bio">Bio</strong><br></br>
                {props.currentUser.bio}<br></br>

                <LinkContainer to="/editprofile">
                    <Button variant="primary">Edit Profile</Button>
                </LinkContainer>
            </div>

            <div className="profile-preferences">
                <h4>Your Match Preferences</h4>
                <strong>Age Range</strong><br></br> 
                {props.currentUser.preference.min_age} to {props.currentUser.preference.max_age}<br></br>
                <strong>Pet Preferences</strong>
                <ul className="profile-pets-pref-list text-center">
                    {props.currentUser.preference.wants_dog ? <li className='mr-2'>Dog</li> : null}
                    {props.currentUser.preference.wants_cat ? <li className='mr-2'>Cat</li> : null}
                    {props.currentUser.preference.wants_bird ? <li className='mr-2'>Bird</li> : null}
                    {props.currentUser.preference.wants_fish ? <li className='mr-2'>Fish</li> : null}
                    {props.currentUser.preference.wants_reptile ? <li className='mr-2'>Reptile</li> : null}
                    {props.currentUser.preference.wants_exotic ? <li className='mr-2'>Exotic</li> : null}
                    {props.currentUser.preference.wants_rodent ? <li className='mr-2'>Rodent</li> : null}
                </ul>
                <strong>Gender Preferences</strong>
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