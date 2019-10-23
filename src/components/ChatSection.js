import React, { Component } from 'react';
import ChatWindow from './ChatWindow';

class ChatSection extends Component {

    state = {
        currentUserText: '',
        currentUserID: 'something',
        currentUserName: 'Berlin S',
    }

    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('Before: ', this.state.currentUserText);
        this.setState(state => {
            const chats = state.chats.concat({
                "id": state.currentUserID,
                "name": state.currentUserName,
                "text": state.currentUserText
              });

            return {chats};
        });

        this.setState({ currentUserText: ''});
    };

    render() {
        return (
            <div className="chat-section">
                <ChatWindow chats={this.state.chats}/>
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
        )
    }
}

export default ChatSection;
