import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-router-dom'


class Login extends React.Component {
    state={
        email:'',
        password:''
    }
    
    handleChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        fetch('http://localhost:8080/auth/login', {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.state),
        })
        .then(res=>res.json())
        .then(res=>{console.log(res)})
        .catch(err=>console.log(err+'err'))
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} >
                    <label>
                        <input name="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                    </label>
                    <label>
                        <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {};


export default Login;
