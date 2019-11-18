import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatList from '../components/ChatList'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
import MessagesContainer from './MessagesContainer';
var axios = require('axios');
const endpoint = "https://petsmatch-frontend.herokuapp.com/"
const socket = socketIOClient(endpoint);


class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMatches: false,
            myMatches: [],
            chatList: [],
            response: false,
            endpoint: "https://petsmatch-frontend.herokuapp.com/",
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
        fetch(`https://petsmatch-backend.herokuapp.com/${this.state.currentMessage.user_id}`, {
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
        fetch('https://petsmatch-backend.herokuapp.com/messages', {
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
            if(otherUser) {
                return <ChatList key={key} otherUser={otherUser} chat={chat} fetchChatMessages={this.fetchChatMessages} />;
            } 
        });
    };

    fetchChatMessages = (chat_id) => {
        fetch(`https://petsmatch-backend.herokuapp.com/chat/${chat_id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then(data => {
            socket.emit('leave', `chat_id_${this.state.currentMessage.chat_id}`)
            this.setState({
                currentDisplayedChat: {
                    messages: data.messages
                },
                currentMessage: {
                    ...this.state.currentMessage,
                    chat_id: data.id
                }
            });
        })
        .then( () => {
            socket.emit('room', `chat_id_${chat_id}`)
        })
        .catch(err => console.log(err))
    };

    fetchMatches = () => {
        fetch(`https://petsmatch-backend.herokuapp.com/matches/${this.state.currentMessage.user_id}`, {
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
        fetch('https://petsmatch-backend.herokuapp.com/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({match_id: key}),
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                currentMessage: {
                    ...this.state.currentMessage,
                    chat_id: data.id
                }
            })
            this.fetchChatMessages(data.id)
            console.log(data.id)
            this.handleGoBack()
            fetch('https://petsmatch-backend.herokuapp.com/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({user_id: this.props.currentUser.id, chat_id: data.id, text: "Welcome to Chat!"})
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                socket.emit("sendMessage", data);
                this.setState({
                    currentMessage: {
                        ...this.state.currentMessage,
                        text: ''
                    } 
                })
            });
        })
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
                            if(!match.chat) {
                                return <MDBListGroupItem key={match.id} onClick={ () => this.findOrCreateNewChatFromMatchClick(match.id)} hover>{otherUser.name}</MDBListGroupItem>
                            }
                        })}
                    </MDBListGroup>
                </MDBContainer>
            </div>
        )
    }

    handleGoBack = () => {
        fetch(`https://petsmatch-backend.herokuapp.com/chats/${this.state.currentMessage.user_id}`, {
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
        this.setState({
            showMatches: false
        })
    }
    
    render() { 
        const socket = socketIOClient(this.state.endpoint);
        return ( 
            <Row className='h-75 mt-3 ml-3 mr-3'>
                <Col sm={3} lg={4}>
                    <div className='h-75 shadow p-3 mb-5 bg-white rounded overflow-auto'>
                        {this.state.showMatches ? <div className=''><h3>Your Matches</h3>{this.renderMatches()}</div> : <div><h3>Your Open Chats</h3>{this.renderChatList()}</div>}
                    </div>
                    <div className='mt-1'>
                        {!this.state.showMatches ? <button onClick={() => this.fetchMatches()}>Start a New Chat</button> : <button onClick={() => this.handleGoBack()}>Go Back</button>}
                    </div>
                </Col>
                <Col id='chat-window'>
                    <div id='messages-window' className='h-100'>
                        <MessagesContainer currentDisplayedChat={this.state.currentDisplayedChat.messages} currentUser={this.state.currentMessage.user_id} currentMessage={this.state.currentMessage} />
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