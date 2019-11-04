import React, { Component } from 'react';
import Users from './Users';
import ChatSection from './ChatSection';

export class ChatContainer extends Component {
    state = {
        users: null,
        loading: true,
        sessionID: null
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data, loading: false});
        })
        .catch(err => console.log('error:',err));
    }

    render() {
        return (
            <div className="chat-container">
                <Users users={this.state.users} loading={this.state.loading} />
                <ChatSection />
            </div>
        )
    }
}

export default ChatContainer;