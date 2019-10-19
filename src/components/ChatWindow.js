import React from 'react';
import Line from './ChatLine';

function ChatWindow(props) {
       return (
        <div className="chat-window">
            {props.chats.map(chat => (
                <Line 
                    key={chat.index} chat={chat}
                />
            ))}
        </div>
    )
}

export default ChatWindow
