import React, { Component } from 'react';
import Users from './Users';
import ChatSection from './ChatSection';
const uuidv4 = require('uuid/v4');

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
        this.postChatMessage();
        this.setState({ currentUserText: ''});
    };

    componentDidMount() {
        this.checkUserSession();
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
        return (
            <div className="chat-container">
                <Users users={this.state.users} loading={this.state.loading} cu={this.state.currentUser} />
                <ChatSection 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    text={this.state.currentUserText}
                    messages={this.state.messages}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default ChatContainer;