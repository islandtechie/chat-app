import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');


class Users extends Component {
    state = {
        currentUser: null,
        sessionid: null,
        users: null,
        loading: true,
    }

    componentDidMount() {
        this.checkUserSession();
    }

    checkUserSession = () => {
        const session = window.localStorage.getItem('SESSION_ID');
        if (session === null) {
            this.createUser(uuidv4());
        }else{
            this.fetchUser(session);
        }
    }

    fetchUser = (id) => {
        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ currentUser: data[0]})
            this.fetchUsers();
        })
        .catch(err => console.log('error:',err));
    }

    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data, loading: false})
        })
        .catch(err => console.log('error:',err));
    }

    createUser = (id) => {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "session_id" : id,
                "username": "User" + (Math.floor(Math.random() * uuidv4().length)* Math.floor(Math.random() * 1000000))        
            })
        })
        .then(res => {
            if (res.status === 201) {
                window.localStorage.setItem('SESSION_ID', id);
                this.setState({ sessionid: window.localStorage.getItem('SESSION_ID')});
                this.fetchUser(this.state.sessionid);
            }
        })
        .catch(err => console.log(err));
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className="users">
                    <h3>Users</h3>
                    <p>Loading User List...</p>
                </div>               
            )
        }else{
            return (
                <div className="users">
                    <h3>Users</h3>
                    <ul>
                        {this.state.users.map(user => (
                            this.state.currentUser.id === user.id ? <li key={user.id}><strong>{user.username} (YOU)</strong> </li> : <li key={user.id}>{user.username}</li>  
                        ))}
                    </ul>
                </div>
            )
        }        
    }
}

export default Users;
