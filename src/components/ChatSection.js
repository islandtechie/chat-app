import React, { Component } from 'react';
import ChatWindow from './ChatWindow';

class ChatSection extends Component {

    state = {
        currentUser: null,
        currentUserText: '',
        currentUserName: null,
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
      this.fetchUser(window.localStorage.getItem('SESSION_ID'));
      this.getChatMessages();
  }

  fetchUser = (id) => {
    fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
        this.setState({ currentUser: data[0]})
    })
    .catch(err => console.log('error:',err));
}

  getChatMessages = () => {
    fetch('/api/messages')
    .then(res => res.json())
    .then(data => {
        console.log(data);
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
