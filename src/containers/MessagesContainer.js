import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact";


class MessagesContainer extends Component {
    state = {  }

    renderChatMessages = () => {
        const currentUser = this.props.currentUser
        if(this.props.currentDisplayedChat.length === 0) {
            return <h3 className='text-muted font-italic mt-5'>Select an Existing Chat or Start a New Chat</h3>
        } else {
            return this.props.currentDisplayedChat.map( (message, key) => {
                return <li key={key} className={message.user_id === currentUser ? 'chat-message w-50 shadow text-right blue lighten-2 rounded-pill ml-auto' : 'chat-message w-50 shadow mr-auto text-left purple lighten-3 rounded-pill'}>{message.text}</li>
            });
        }
    };

    render() { 
        return (                         
        <div id='incoming-messages' className='h-75 shadow p-3 mb-3 bg-white rounded'>
            <MDBContainer className='pt-1 pl-1 pr-1'>
                <MDBListGroup className='w-100'>
                    {this.renderChatMessages()}
                </MDBListGroup>
            </MDBContainer>
        </div> );
    }
}
 
export default MessagesContainer;