import React, { Component } from 'react';
import ChatWindow from './ChatWindow';

class ChatSection extends Component {

    state = {
        currentUserText: '',
        currentUserID: 1,
        currentUserName: 'Berlin Smith',
        chats: null,
        loading: true
    }

    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        this.postChatMessage();
        this.setState({ currentUserText: ''});
    };

    componentDidMount() {
        this.getChatMessages();
    }

    getChatMessages = () => {
        fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
            this.setState({ chats: data, loading: false})
        })
        .catch(err => console.log('error:',err));
    }

    postChatMessage = () => {
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id" : this.state.currentUserID,
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
       if(this.state.loading === false) {
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
            </div>)
       }else{
        return (
            <div className="chat-section">
            <ChatWindow chats={this.state.chats} loading={this.state.loading} />
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
}

export default ChatSection;
