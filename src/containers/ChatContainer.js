import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatList from '../components/ChatList'
import { nullLiteral } from '@babel/types';
import { resolveNaptr } from 'dns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
import MessagesContainer from './MessagesContainer';
var axios = require('axios');
const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint);


class ChatContainer extends Component {
    constructor(props) {
        super(props);
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
                user_id: props.currentUser.id,
                chat_id: 0
            }
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/chats/${this.state.currentMessage.user_id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                chatList: data
            })
        })
        .then( () => {
            socket.on('connect', () => {
            })
            socket.on("receiveMessage", data => {
                this.setState({
                    currentDisplayedChat: {
                        messages: [...this.state.currentDisplayedChat.messages, data]}
                })
            })
        });
    }    
    
    sendChatMessage = (socket, event) => {
        event.preventDefault()
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify(this.state.currentMessage)
        })
        .then(resp => resp.json())
        .then(data => {
            socket.emit("sendMessage", data);
            this.setState({
                currentMessage: {
                    ...this.state.currentMessage,
                    text: ''
                } 
            })
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
            if(chat.user_one_id === this.state.currentMessage.user_id) {
                var otherUser = chat.user_two.name;
            } else if (chat.user_two_id === this.state.currentMessage.user_id) {
                var otherUser = chat.user_one.name;
            };
            console.log('other user', otherUser)
            if(otherUser) {
                return <ChatList key={key} otherUser={otherUser} chat={chat} fetchChatMessages={this.fetchChatMessages} />;
            } 
        });
    };

    fetchChatMessages = (chat_id) => {
        fetch(`http://localhost:3000/chat/${chat_id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then(data => {
            socket.emit('leave', `chat_id_${this.state.currentMessage.chat_id}`)
            console.log('fetch messages data', data)
            this.setState({
                currentDisplayedChat: {
                    messages: data.messages
                },
                currentMessage: {
                    ...this.state.currentMessage,
                    chat_id: chat_id
                }
            });
        })
        .then( () => {
            socket.emit('room', `chat_id_${chat_id}`)
        })
        .catch(err => console.log(err))
    };

    fetchMatches = () => {
        fetch(`http://localhost:3000/matches/${this.state.currentMessage.user_id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
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
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({match_id: key}),
        })
        .then(resp => resp.json())
        .then(data => {
            this.fetchChatMessages(data.id)
        });
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

    testChatUserTextAlign = (num) => {
        this.setState({
            currentMessage: {
                ...this.state.currentMessage,
                user_id: num
            }
        });
    }
    
    render() { 
        const socket = socketIOClient(this.state.endpoint);
        return ( 
            <Row className='h-75 mt-3 ml-3 mr-3'>
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
                        <MessagesContainer currentDisplayedChat={this.state.currentDisplayedChat.messages} currentUser={this.state.currentMessage.user_id} />
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