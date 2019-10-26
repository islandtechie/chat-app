import React from 'react'

function ChatLine(props) {
    const {username, text} = props.chat
    return (
        <p>
        <em>{username}:</em> {text}
        </p>
    )
}

export default ChatLine;
