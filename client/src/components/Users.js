import React from 'react';
 Users = ({users, loading, cu}) => {
    {

        if (loading === true) {
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
                        {users.map(user => (<li key={user.id}>{user.username}</li>))}
                    </ul>
                </div>
            )
        }
    }
}

export default Users;