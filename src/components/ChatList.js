import React, { Component } from 'react';
import { MDBListGroupItem } from "mdbreact";

const ChatList = (props) => {
    return ( 
            <MDBListGroupItem onClick={() => props.fetchChatMessages(props.chat.chat.id)}>
                {props.otherUser}
            </MDBListGroupItem>
     );
}
 
export default ChatList;

