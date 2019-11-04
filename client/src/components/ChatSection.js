import React from 'react';

const ChatSection = ({onChange, onSubmit, text, loading, messages}) => {

       if (loading === false) {
        return (
            <div className="chat-section">
                <div className="chat-window">
                    <ul>
                    {messages.map(message => (
                        <li key={message.id}> 
                            {message.username}: {message.text}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="chat-controls">
                    <form action="#" onSubmit={onSubmit}>
                    <input  
                        type="text" 
                        name="text"
                        onChange={onChange}
                        value={text}
                    />
                        <button type="submit">SEND</button>
                    </form>
                </div>
            </div>
        )
       }else{
        return (
            <div className="chat-section">
                <div className="chat-window">
                    <p>Loading Messages...</p>
                </div>
                <div className="chat-controls">
                    <form action="#" onSubmit={onSubmit}>
                    <input  
                        type="text" 
                        name="text"
                        onChange={onChange}
                        value={text}
                    />
                        <button type="submit">SEND</button>
                    </form>
                </div>
            </div>
        )
       }
}

export default ChatSection
