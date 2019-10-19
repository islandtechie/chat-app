import React, { Component } from 'react';
import ChatWindow from './ChatWindow';

class ChatSection extends Component {

    state = {
        currentUserText: '',
        currentUserID: 'something',
        currentUserName: 'Berlin S',
        chats: [
            
            {
              "_id": "5dab4d53169e50eb1e545cb4",
              "name": "Ebony Vinson",
              "about": "Officia velit mollit laborum amet nisi fugiat id est. Est laboris do quis velit id et exercitation ipsum. Velit deserunt exercitation Lorem officia.\r\n"
            },
            {
              "id": "5dab4d53b957e4209ff08b02",
              "name": "Hahn Wagner",
              "text": "Exercitation deserunt tempor nostrud esse ad incididunt velit duis minim laboris. Nostrud veniam veniam occaecat voluptate Lorem incididunt eiusmod sunt id consectetur proident do do. Eiusmod adipisicing ea esse elit pariatur ea. Occaecat ad esse nulla aute amet mollit quis ut ut velit nulla enim.\r\n"
            },
            {
              "id": "5dab4d534d211b945831f855",
              "name": "Sampson Shelton",
              "text": "Velit ad tempor cupidatat commodo Lorem tempor sit ad. Ipsum in quis dolor sit anim nostrud. Consequat quis labore occaecat enim nisi. Ipsum deserunt officia ut nisi ipsum ullamco tempor fugiat do. Laboris cillum eu aute est. Deserunt Lorem incididunt ex eiusmod deserunt consectetur.\r\n"
            },
            {
              "id": "5dab4d53d77ed8cab20b9adf",
              "name": "Roxanne Lawson",
              "text": "Consectetur ex enim incididunt et qui. Ex dolor qui sit do laborum ad nostrud proident nisi. Occaecat irure sint pariatur ut minim. Adipisicing officia in nisi exercitation duis nisi. Voluptate duis ad dolore velit.\r\n"
            },
            {
              "id": "5dab4d533ba0477b23aa1059",
              "name": "Tate Gamble",
              "text": "Ex fugiat reprehenderit aute et nisi labore reprehenderit eiusmod nisi. Amet occaecat anim voluptate elit magna. Ut aute exercitation qui in nulla irure fugiat. Eu qui occaecat ullamco laboris tempor duis esse ex minim commodo anim laboris.\r\n"
            },
            {
              "id": "5dab4d5303d7d5b46564daea",
              "name": "Moses Kane",
              "text": "Sunt deserunt proident velit ea occaecat dolor culpa excepteur sint sunt est occaecat laboris. Do esse nisi cillum aute dolor nostrud dolor sunt esse cillum. Lorem ipsum fugiat nulla esse occaecat proident ipsum dolor. Ullamco esse ipsum et Lorem occaecat laborum exercitation ex in in ullamco ea est. Veniam labore ipsum laborum quis officia nisi irure.\r\n"
            }
          ]
    }

    onChange = (e) => {
        this.setState({ currentUserText: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('Before: ', this.state.currentUserText);
        this.setState(state => {
            const chats = state.chats.concat({
                "id": state.currentUserID,
                "name": state.currentUserName,
                "text": state.currentUserText
              });

            return {chats};
        });

        this.setState({ currentUserText: ''});
    };

    render() {
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
            </div>
        )
    }
}

export default ChatSection;
