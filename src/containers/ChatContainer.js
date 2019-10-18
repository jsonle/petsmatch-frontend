import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { nullLiteral } from '@babel/types';
import { resolveNaptr } from 'dns';
var axios = require('axios');


class ChatContainer extends Component {
    constructor() {
        super();
        this.state = {
            chatList: [],
            response: false,
            endpoint: "http://127.0.0.1:8000",
            currentDisplayedChat: {
                messages: []
            },
            currentMessage: {
                text: '',
                user_id: 1,
                chat_id: 0
            }
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        fetch('http://localhost:3000/chats')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                chatList: data
            })
        })

        socket.on("receiveMessage", data => {
            console.log(data)
            this.setState({
                currentDisplayedChat: {
                    messages: [...this.state.currentDisplayedChat.messages, data]}
            })
            // this.setState({ response: data })
        })
    }    
    
    sendChatMessage = (socket, event) => {
        event.preventDefault()
        // try {
        //   const response = await axios.get("http://localhost:3000/chats/4")
        //   socket.emit("chatMessage", response.data.id);
        // } catch (error) {
        //   console.error(`Error: ${error.code}`);
        // }
        // console.log('button state', this.state)
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.currentMessage)
        })
        .then(resp => resp.json())
        .then(data => {
            socket.emit("sendMessage", data);
        })

        
      };


    handleMessageInputChange = (event) => {
        this.setState({
            currentMessage: {
                ...this.state.currentMessage,
                text: event.target.value
            } 
        })
    }

    renderChatList = () => {
        return this.state.chatList.map( (chat, key) => {
            return(
                <li onClick={() => this.fetchChatMessages(chat.id)}>
                    {chat.user_one.name}/{chat.user_two.name}
                </li>
            )
        })
    }

    fetchChatMessages = (chat_id) => {
        fetch(`http://localhost:3000/chats/${chat_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                currentDisplayedChat: {
                    messages: data.messages
                },
                currentMessage: {
                    ...this.state.currentMessage,
                    chat_id: chat_id
                }
            })
        })
    }

    renderChatMessages = () => {
        return this.state.currentDisplayedChat.messages.map( (message, key) => {
            return (
                <li>
                    {message.text}
                </li>
            )
        })
    }

    divStyle = {
        float: 'left',
        border: '5px solid black',
        width: '40%',
        margin: '50px'
    };

    formStyle = {
        position: 'fixed',
        width: '100%',
        bottom: '25%'
    }
    

    render() { 
        const socket = socketIOClient(this.state.endpoint);
        console.log('state',this.state)
        return ( 
            <div>
                This is the ChatContainer
                <br></br>
                <div style={this.divStyle}>
                    <ul>
                        {this.renderChatList()}
                    </ul>
                </div>
                <div id='chat-window'>
                    <div id='incoming-messages' style={this.divStyle}>
                        <ul>
                            {this.renderChatMessages()}
                        </ul>
                    </div>
                    <br></br>
                    <form style={this.formStyle} onSubmit={(e) => {this.sendChatMessage(socket, e)}}>
                        <input type='text' onChange={(event) => this.handleMessageInputChange(event)} value={this.state.currentMessage.text}></input><input type='submit'></input>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ChatContainer;