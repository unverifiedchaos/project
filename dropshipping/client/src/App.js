import * as React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {Route, Switch} from 'react-router'                                                                                                                                  
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'universal-cookie'
import OAuth from './components/oauth'
import Dashboard from './components/dashboard'
import UsersList from './components/UsersList'
import Login from './components/login'
import Signup from './components/Signup'
import Userdata from './components/Userdata'

class App extends React.Component {
  
  state={
    data:""
  }

  handleCookie=()=>{
    const cookies= new Cookies()
    cookies.set('cookietest', 'cookiesvalue', {path:'/'})
    console.log(cookies.get('cookietest'))
  }
  
  handleCallback=(childData)=>{
    this.setState({data:childData})
  }


  render() {
    return (
      <div >
      <button onClick={this.handleCookie} >cookie</button>
      <OAuth />
      <ul>
      <li><a href="/login">Login</a></li>
      <li><a href="/dashboard">dashboard</a></li>
      <li><a href="/users">users</a></li>
      <li><a href="/signup">signin</a></li>
      <li><a href="/userdata">userdata</a></li>
      </ul>
      <BrowserRouter>
        <Route path="/userdata" component={Userdata} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UsersList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </BrowserRouter>
    </div>
    );
  }
}

App.propTypes = {};

export default App;

