import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
const socket = require('socket.io-client')('http://localhost:5000');

/* TODO:
    1. Completed New User Event with Socket.io
    2. Make Current User be the first in the list
*/
export class ChatContainer extends Component {
    constructor(props) {
        super(props);
      }

    state = {
        users: null,
        messages: null,
        loading: true,
        sessionID: null,
        currentUser: null,
        currentUserText:'',
        messagesEnd: null
    }

    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.currentUserText !== '') {
            this.postChatMessage();
            this.setState({ currentUserText: ''});
            socket.emit('message-sent');
            socket.emit('');
        }
    }

    componentDidMount() {
        this.checkUserSession();
        socket.on('update-messages', () => {
            this.getChatMessages();
        });

        socket.on('update-users', () => {
            //this.fetchUsers();
        });
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    checkUserSession = () => {
        const id = window.localStorage.getItem('SESSION_ID');

        if (id === null) {
            this.createUser(uuidv4());
        }else{
            Promise.all([
                fetch(`/api/users/${id}`).then(data => data.json()),
                fetch('/api/users').then(data => data.json()),
                fetch('/api/messages').then(data => data.json())
            ]).then(([user, users, messages]) => {
                this.setState({
                    currentUser: user[0],
                    users: users,
                    messages: messages,
                    loading: false
                })
            })
            .catch(err => console.log(err))
        }
    }

    createUser = (id) => {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "session_id" : id,
                "username": "User" + (Math.floor(Math.random() * uuidv4().length)* Math.floor(Math.random() * 1000000))        
            })
        })
        .then(res => {
            if (res.status === 201) {
                window.localStorage.setItem('SESSION_ID', id);
                this.setState({ sessionid: window.localStorage.getItem('SESSION_ID')});
                this.fetchUser(this.state.sessionid);
                this.fetchUsers();
                socket.emit('new-user');
            }
        })
        .catch(err => console.log(err));
    }

    fetchUser = (id) => {
        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ currentUser: data[0]})
        })
        .catch(err => console.log('error:',err));
    }

    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data, loading: false})
        })
        .catch(err => console.log('error:',err));
    }


    getChatMessages = () => {
        fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
            this.setState({ messages: data})
        })
        .catch(err => console.log('error:',err));
}

    postChatMessage = () => {
        fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id" : this.state.currentUser.id,
                "text": this.state.currentUserText                  
            })
        })
    
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }

    render() {
        if (this.state.loading === false) {
            return (
                <div className="chat-container">
                    <div className="users">
                        <h3>Users</h3>
                            <ul>
                                {this.state.users.map(user => (<li key={user.id}>{user.username}</li>))}
                            </ul>
                    </div>
                    <div className="chat-section">
                        <div className="chat-window" ref={this.window}>
                            {this.state.messages.map(message => (
                                <p key={message.id}> 
                                {   message.username}: {message.text}
                                </p>
                            ))}
                            <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </div>
                        <div className="chat-controls">
                            <form action="#" onSubmit={this.onSubmit}>
                                <input  
                                type="text" 
                                name="text"
                                onChange={this.onChange}
                                value={this.state.currentUserText}
                                />
                                <button type="submit">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="chat-container">
                    <div className="users">
                        <h3>Users</h3>
                            <p>Loading Users</p>
                    </div>
                    <div className="chat-section">
                        <div className="chat-window">
                            <p>Loading Messages</p>

                            <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </div>
                        <div className="chat-controls">
                            <form action="#">
                                <input  
                                type="text" 
                                name="text"
                                onChange={this.onChange}
                                value={this.state.currentUserText}

                                disabled
                                />
                                <button type="submit">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default ChatContainer;