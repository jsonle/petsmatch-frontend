import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const UserMenu = ({ currentUser, handleLogout }) => {
    return (
        <DropdownButton title={currentUser.name}>
            <LinkContainer to="/profile">
                <Dropdown.Item>View Profile</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/browse">
                <Dropdown.Item>Browse</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/chat/${currentUser.id}`}>
                <Dropdown.Item >Chat</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </LinkContainer>
        </DropdownButton>
    )
}
 
export default UserMenu;