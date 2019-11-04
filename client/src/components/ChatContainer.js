import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
const socket = require('socket.io-client');

export class ChatContainer extends Component {
    state = {
        users: null,
        messages: null,
        loading: true,
        sessionID: null,
        currentUser: null,
        currentUserText:''
    }

    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.currentUserText !== '') {
            this.postChatMessage();
            this.setState({ currentUserText: ''});
        }
    }

    componentDidMount() {
        this.checkUserSession();
        socket.connect();
        socket.emit()
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
            }
        })
        .catch(err => console.log(err));
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
        .then(res => {
            if (res.status === 201) {
                this.getChatMessages()
            }
        });
    
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
                        <div className="chat-window">
                            <ul>
                                {this.state.messages.map(message => (
                                    <li key={message.id}> 
                                    {   message.username}: {message.text}
                                    </li>
                                ))}
                            </ul>
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