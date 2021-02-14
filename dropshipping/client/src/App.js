import { Component } from 'react';
import './App.css';
import OAuth from './components/oauth'
import UsersList from './components/UsersList'

export default class App extends Component {

  state={
    users:[]//store users from api
  }

  componentDidMount(){
    fetch('http://localhost:8080/')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({users:data}    )
    })
    .catch(err=>{
      console.log(err+' err')
    })
  }

  render() {
    return (
      <div>
        <OAuth />
        <UsersList users={this.state.users} />
      </div>
    )
  }
}


