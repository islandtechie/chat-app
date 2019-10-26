import React from 'react';
import Line from './ChatLine';

function ChatWindow(props) {
      if(props.loading === true) {
        return (
            <div className="chat-window">
                <p>Loading Messages...</p>
            </div>
        )
      }else{
        return (
            <div className="chat-window">
                {props.chats.map(chat => (
                    <Line 
                        key={(chat.id /.418) * Math.random()} chat={chat}
                    />
                ))}
            </div>
        )
      }
}

export default ChatWindow
