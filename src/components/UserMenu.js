import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const UserMenu = ({ currentUser, handleLogout }) => {
    return (
        <DropdownButton title={currentUser.name}>
            <LinkContainer to="/profile">
                <Dropdown.Item>View Profile</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/addpets`}>
                <Dropdown.Item >Add Pets</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/preferences">
                <Dropdown.Item>Edit Preferences</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/browse">
                <Dropdown.Item>Browse</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/chat`}>
                <Dropdown.Item >Chat</Dropdown.Item>
            </LinkContainer>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
    )
}
 
export default UserMenu;