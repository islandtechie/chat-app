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
            <p>Vegeta D.</p>
            <p>Gohan S.</p>
            <p>Goku S.</p>
          </div>
          <div className="chat-section">
                <div className="chat-window">
                    <p><em>Berlin S:</em> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias provident amet eos ipsa impedit aperiam mollitia sequi atque, illum nobis inventore, blanditiis facere labore laudantium expedita deserunt repudiandae voluptatem numquam. </p>
                    <p><em>Vegeta D:</em> Kakurot what is this fool writing?</p>
                    <p><em>Goku S:</em> Now Now Vegeta he only playing around?</p>
                    <p><em>Berlin S:</em> kaaa Maaay yaaa...</p>
                    <p><em>Goku S:</em> Vegeta ready!  Fuuusion haa!</p>
                </div>
                <div className="chat-controls">
                    <form action="#">
                        <input type="text" value="Guyssss I kid I kid..lol"/>
                        <button type="submit">SEND</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
