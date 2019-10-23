import React, { Component } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";


const FilterMenu = () => {
    return ( 
        <MDBDropdown id='browse-filter'>
            <MDBDropdownToggle caret color="primary">
            Filter Results
            </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                <MDBDropdownItem>

                </MDBDropdownItem>
                <MDBDropdownItem>Age</MDBDropdownItem>
                <MDBDropdownItem>Gender</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
     );
}
 
export default FilterMenu;


