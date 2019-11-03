import React, { Component } from 'react';

export class ChatSection extends Component {
    state = {
        currentUserText: ''
    }
    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ currentUserText: ''});
    };

    render() {
        return (
            <div className="chat-section">
                <div className="chat-window">
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
        )
    }
}

export default ChatSection
