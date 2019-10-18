import React, { Component } from 'react';

const ChatList = (props) => {
    return ( 
        <li onClick={() => props.fetchChatMessages(props.chat.id)}>
            {props.chat.user_one.name}/{props.chat.user_two.name}
        </li>
     );
}
 
export default ChatList;

