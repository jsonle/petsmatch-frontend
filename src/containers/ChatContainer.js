import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatList from '../components/ChatList'
import { nullLiteral } from '@babel/types';
import { resolveNaptr } from 'dns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
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
                room: undefined,
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
        fetch('http://localhost:3000/chats')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                chatList: data
            })
        });
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
        });
    };

    handleMessageInputChange = (event) => {
        this.setState({
            currentMessage: {
                ...this.state.currentMessage,
                text: event.target.value
            } 
        });
    };

    renderChatList = () => {
        return this.state.chatList.map( (chat, key) => {
            console.log(chat)
            if(chat.user_one.id === this.state.currentMessage.user_id) {
                var otherUser = chat.user_two;
            } else {
                var otherUser = chat.user_one;
            };
            return(
                <ChatList key={key} otherUser={otherUser} chat={chat} fetchChatMessages={this.fetchChatMessages} />
            );
        });
    };

    fetchChatMessages = (chat_id) => {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        fetch(`http://localhost:3000/chats/${chat_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                currentDisplayedChat: {
                    room: chat_id,
                    messages: data.messages
                },
                currentMessage: {
                    ...this.state.currentMessage,
                    chat_id: chat_id
                }
            });
        })
        .then( () => {
            socket.on('connect', () => {
                socket.emit('room', `chat_id_${chat_id}`)
            })
            socket.on("receiveMessage", data => {
                this.setState({
                    currentDisplayedChat: {
                        messages: [...this.state.currentDisplayedChat.messages, data]}
                })
            })
        })
    };

    renderChatMessages = () => {
        const currentUser = this.state.currentMessage.user_id
        return this.state.currentDisplayedChat.messages.map( (message, key) => {
            return <li key={key} className={message.user_id === currentUser ? 'chat-message text-right green lighten-2 rounded-pill' : 'chat-message text-left purple lighten-3 rounded-pill'}>{message.text}</li>
        });
    };

    fetchMatches = () => {
        fetch(`http://localhost:3000/matches/${this.state.currentMessage.user_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                showMatches: true,
                myMatches: data
            });
        });
    };

    findOrCreateNewChatFromMatchClick = (key) => {
        fetch('http://localhost:3000/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({match_id: key}),
        })
        .then(resp => console.log(resp))
        // .then(data => {
        //     console.log(data)
        // })
    }

    renderMatches = () => {
        return (
            <div>
                <MDBContainer className='pt-1 pl-1 pr-1'>
                    <MDBListGroup style={{ width: "100%" }}>
                        {this.state.myMatches.map( (match) => {
                            if(match.user_one.id === this.state.currentMessage.user_id) {
                                var otherUser = match.user_two;
                            } else {
                                var otherUser = match.user_one
                            }
                            return (
                                <MDBListGroupItem key={match.id} onClick={ () => this.findOrCreateNewChatFromMatchClick(match.id)} hover>{otherUser.name}</MDBListGroupItem>
                            )
                        }
                        )}
                    </MDBListGroup>
                </MDBContainer>
            </div>
        )
    }

    handleGoBack = () => {
        this.setState({
            showMatches: false
        })
    }

    testChatUserTextAlign = () => {
        this.setState({
            currentMessage: {
                ...this.state.currentMessage,
                user_id: 2
            }
        });
    }
    
    render() { 
        const socket = socketIOClient(this.state.endpoint);
        return ( 
            <Row className='h-75 mt-3 ml-3 mr-3'>
                <br></br>
                <button onClick={() => this.testChatUserTextAlign()}>Test</button>
                <Col lg={4}>
                    <div className='h-75 border border-dark pt-1 pl-1 pr-1'>
                        {this.state.showMatches ? <div className='overflow-auto'>{this.renderMatches()}</div> : <div>{this.renderChatList()}</div>}
                    </div>
                    <div className='mt-1'>
                        {!this.state.showMatches ? <button onClick={() => this.fetchMatches()}>Start a New Chat</button> : <button onClick={() => this.handleGoBack()}>Go Back</button>}
                    </div>
                </Col>
                <Col id='chat-window'>
                    <div id='messages-window' className='h-100'>
                        <div id='incoming-messages' className='h-75 overflow-auto border border-dark'>
                        <MDBContainer className='pt-1 pl-1 pr-1'>
                            <MDBListGroup className='w-100'>
                                {this.renderChatMessages()}
                            </MDBListGroup>
                        </MDBContainer>
                        </div>
                        <form className='mt-1' onSubmit={(e) => {this.sendChatMessage(socket, e)}}>
                            <input 
                                className='w-75' 
                                type='text' 
                                onChange={(event) => this.handleMessageInputChange(event)} 
                                value={this.state.currentMessage.text}>
                            </input>
                            <input type='submit'></input>
                        </form>
                    </div>
                    <br></br>
                </Col>
            </Row>
        );
    }
}
 
export default ChatContainer;