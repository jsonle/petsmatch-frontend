import React, { Component } from 'react';
import { MDBListGroupItem } from "mdbreact";

const ChatList = (props) => {
    return ( 
        <MDBListGroupItem onClick={() => props.fetchChatMessages(props.chat.id)}>
            {props.otherUser.name}
        </MDBListGroupItem>
     );
}
 
export default ChatList;

