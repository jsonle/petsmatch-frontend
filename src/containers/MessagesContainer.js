import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact";


class MessagesContainer extends Component {
    state = {  }

    renderChatMessages = () => {
        const currentUser = this.props.currentUser
        return this.props.currentDisplayedChat.map( (message, key) => {
            return <li key={key} className={message.user_id === currentUser ? 'chat-message text-right green lighten-2 rounded-pill' : 'chat-message text-left purple lighten-3 rounded-pill'}>{message.text}</li>
        });
    };

    render() { 
        return (                         
        <div id='incoming-messages' className='h-75 overflow-auto border border-dark'>
            <MDBContainer className='pt-1 pl-1 pr-1'>
                <MDBListGroup className='w-100'>
                    {this.renderChatMessages()}
                </MDBListGroup>
            </MDBContainer>
        </div> );
    }
}
 
export default MessagesContainer;