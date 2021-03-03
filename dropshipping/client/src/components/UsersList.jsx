import React, { Component } from 'react'

export default class UsersList extends Component {

    state={
        users:[]//store users from api
      }
    
      componentDidMount(){
        fetch('http://localhost:8080/posts')
        .then(res=>res.json(res))
        .then(data=>{this.setState({users:data})})
        .catch(err=>{
          console.log(err+' err')
        })
      }

    render() {
        const users=this.state.users;
        console.log(users+'ussers boi')
        if(users.length===0 || !users)return<p>No current users..</p>
        return (
            <div>
                <h2 className="list-head">Users Signed up!</h2>
                {users.map((user)=>{
                    return(
                        <div key={user._id} >
                        <hr />
                            <p>Name:{user.name}</p>
                            <p>Post:{user.post}</p>
                        <hr />
                        </div>
                    );
                })}
            </div>
        )
    }
}

