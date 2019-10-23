import React from 'react';
import Users from './components/Users';
import './App.css';
import ChatSection from './components/ChatSection';

function App() {
  return (
    <div className="App">
        <h1>Chatty!</h1>
        <div className="chat-container">
          <Users />
         
        </div>
    </div>
  );
}

export default App;
