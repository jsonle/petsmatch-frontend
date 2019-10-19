import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatList from '../components/ChatList'
import { nullLiteral } from '@babel/types';
import { resolveNaptr } from 'dns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
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
            console.log(chat)
            if(chat.user_one.id === this.state.currentMessage.user_id) {
                var otherUser = chat.user_two;
            } else {
                var otherUser = chat.user_one
            }
            return(
                <ChatList key={key} otherUser={otherUser} fetchChatMessages={this.fetchChatMessages} />
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

    createNewChatFromMatchClick = (key) => {
        fetch('http://localhost:3000/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                match_id: key
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    renderMatches = () => {
        return (
            <div>
                <ul>
                    {this.state.myMatches.map( (match, key) => <li key={key} onClick={ () => this.createNewChatFromMatchClick(key)}>{match.user_one.name}/{match.user_two.name}</li>)}
                </ul>
            </div>
        )
    }

    divStyle = {
        height: '400px',
        overflow: 'scroll',
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
            <Row>
                <br></br>
                <Col lg={4}>
                    <div>
                        {this.state.showMatches ? <div>{this.renderMatches()}</div> : <ul>{this.renderChatList()}</ul>}
                    </div>
                    <div>
                        <button onClick={() => this.getMatches()}>Start a Chat</button>
                    </div>
                </Col>
                <Col id='chat-window'>
                    <div id='incoming-messages'>
                        <ul>
                            {this.renderChatMessages()}
                        </ul>
                        <form onSubmit={(e) => {this.sendChatMessage(socket, e)}}>
                            <input type='text' onChange={(event) => this.handleMessageInputChange(event)} value={this.state.currentMessage.text}></input><input type='submit'></input>
                        </form>
                    </div>
                    <br></br>
                    

                </Col>
            </Row>
        );
    }
}
 
export default ChatContainer;