import React from 'react';

ChatSection = ({onChange, onSubmit, text}) => {

        return (
            <div className="chat-section">
                <div className="chat-window">
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

export default ChatSection
