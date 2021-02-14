import React, { Component } from 'react'

export default class UsersList extends Component {
    render() {
        const {users}=this.props;
        console.log(users+'ussers boi')
        if(users.length===0 || !users)return<p>No current users..</p>
        return (
            <div>
                <h2 className="list-head">Users Signed up!</h2>
                {users.map((user)=>{
                    return(
                        <div>
                        <hr />
                        <p>{user.name}</p>
                        <p>{user.gender}</p>
                        <p>{user.email}</p>
                        <hr />
                        </div>
                    );
                })}
            </div>
        )
    }
}

