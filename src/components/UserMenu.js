import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const UserMenu = ({ currentUser, handleLogout }) => {
    return (
        <DropdownButton id="dropdown-basic-button" title={currentUser.name}>
            <Dropdown.Item tag={Link} to="/profile">View Profile</Dropdown.Item>
            <Dropdown.Item tag={Link} to="/browse">Browse</Dropdown.Item>
            <Dropdown.Item tag={Link} to={`/chat/${currentUser.id}`}>Chat</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
    )
}
 
export default UserMenu;