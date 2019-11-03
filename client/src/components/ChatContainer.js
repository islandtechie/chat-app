import React, { Component } from 'react';
import Users from './Users';
import ChatSection from './ChatSection';

export class ChatContainer extends Component {
    render() {
        return (
            <div className="chat-container">
                <Users />
                <ChatSection />
            </div>
        )
    }
}

export default ChatContainer;