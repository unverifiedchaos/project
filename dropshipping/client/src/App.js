import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import OAuth from './components/oauth'
import Dashboard from './components/dashboard'
import UsersList from './components/UsersList'
import Login from './components/login'

function App(){

  return (
    <div >
      <OAuth />
      <ul>
      <li><a href="/login">Login</a></li>
      <li><a href="/dashboard">dashboard</a></li>
      <li><a href="/users">users</a></li>
      </ul>
        <BrowserRouter>
          <Switch>
            <Route path='/dashboard'>
                <Dashboard />
            </Route>
            <Route path='/users'>
              <UsersList/>
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default App;
