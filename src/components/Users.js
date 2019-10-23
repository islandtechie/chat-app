import React, { Component } from 'react'

class Users extends Component {
    state = {
       users: null,
       loading: true
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data, loading: false})
        })
        .catch(err => console.log('error:',err));
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
                    <li key={user.id}>{user.username}</li>
                ))}
                </ul>
            </div>
            )
        }        
    }
}

export default Users;
