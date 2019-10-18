import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatList from '../components/ChatList'
import { nullLiteral } from '@babel/types';
import { resolveNaptr } from 'dns';
var axios = require('axios');

class ChatContainer extends Component {
    constructor() {
        super();
        this.state = {
            showMatches: false,
            myMatches: [],
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
        })
    }    
    
    sendChatMessage = (socket, event) => {
        event.preventDefault()
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
                <ChatList key={key} chat={chat} fetchChatMessages={this.fetchChatMessages} />
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
                <li key={key}>
                    {message.text}
                </li>
            )
        })
    }

    getMatches = () => {
        fetch(`http://localhost:3000/matches/${this.state.currentMessage.user_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                showMatches: true,
                myMatches: data
            })
        })
    }

    renderMatches = () => {
        return (
            <div>
                <ul>
                    {this.state.myMatches.map( (match, key) => <li key={key}>{match.user_one.name}/{match.user_two.name}</li>)}
                </ul>
            </div>
        )
    }

    divStyle = {
        float: 'left',
        border: '5px solid black',
        width: '35%',
        margin: '50px',
        height: '400px',
        overflow: 'scroll',
        padding: '5px'
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
                    <div>
                        <button onClick={() => this.getMatches()}>Start a Chat</button>
                    </div>
                </div>
                <div id='chat-window'>
                    <div id='incoming-messages' style={this.divStyle}>
                        <ul>
                            {this.renderChatMessages()}
                        </ul>
                    </div>
                    <br></br>
                    {this.state.showMatches && this.renderMatches()}
                    <form style={this.formStyle} onSubmit={(e) => {this.sendChatMessage(socket, e)}}>
                        <input type='text' onChange={(event) => this.handleMessageInputChange(event)} value={this.state.currentMessage.text}></input><input type='submit'></input>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ChatContainer;