import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

const ChatList = (props) => {
    return ( 
        <MDBListGroupItem onClick={() => props.fetchChatMessages(props.chat.id)}>
            {/* {props.chat.user_one.name}/{props.chat.user_two.name} */}
            {props.otherUser.name}
        </MDBListGroupItem>
     );
}
 
export default ChatList;

