import React, { Component } from 'react';
import Users from './Users';
import ChatSection from './ChatSection';
const uuidv4 = require('uuid/v4');

export class ChatContainer extends Component {
    state = {
        users: null,
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
        this.setState({ currentUserText: ''});
    };

    componentDidMount() {
        this.checkUserSession();
    }

    checkUserSession = () => {
        const session = window.localStorage.getItem('SESSION_ID');

        if (session === null) {
            this.createUser(uuidv4());
        }else{
            this.fetchUser(session);  
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

    fetchUser = (id) => {
        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ currentUser: data[0]})
            this.fetchUsers();
        })
        .catch(err => console.log('error:',err));
    }

    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {this.setState({ users: data, loading: false});})
        .catch(err => console.log('error:',err));
    }

    render() {
        return (
            <div className="chat-container">
                <Users users={this.state.users} loading={this.state.loading} cu={this.state.currentUser} />
                <ChatSection 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    text={this.state.currentUserText}
                />
            </div>
        )
    }
}

export default ChatContainer;