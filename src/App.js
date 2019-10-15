import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Chatty!</h1>
        <div className="chat-container">
          <div className="users">
            <h3>Users</h3>
            <p>Berlin S. (You)</p>
          </div>
          <div className="chat-section">
                <div className="chat-window">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="chat-controls">
                    <form action="#">
                        <input type="text" />
                        <button type="submit">SEND</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
