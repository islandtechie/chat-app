import React from 'react'

function ChatLine(props) {
    const {name, text} = props.chat
    return (
        <p>
        <em>{name}:</em> {text}
        </p>
    )
}

export default ChatLine;
