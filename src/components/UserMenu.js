import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const UserMenu = ({ currentUser, handleLogout }) => {
    return (
        <DropdownButton id="dropdown-basic-button" title={currentUser.name}>
            <LinkContainer to="/profile">
                <Dropdown.Item>View Profile</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/browse">
                <Dropdown.Item>Browse</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/chat/${currentUser.id}`}>
                <Dropdown.Item >Chat</Dropdown.Item>
            </LinkContainer>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
    )
}
 
export default UserMenu;