import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    state={
        email:'',
        password:''
    }
    
    componentDidMount(){
        fetch('http://localhost:8080/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.email),
            body:JSON.stringify(this.state.password)
        })
        .then(res=>res.json())
        .then(data=>console.log('Success : '+ data))
        .catch(err=>console.log(err+'err'))
    }

    handleChange=(e)=>{
        const input = e.target;
        const value=input.value;
        this.setState({ [input.name]:value })
        console.log('handleChange')
    }

//saving data in sessionStorage
    handleFormSubmit=()=>{
        const {email, password}=this.state;
        console.log('formsubmit')
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('password', password)
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleFormSubmit} >
                    <label>
                        <input value={this.state.email} name="email" onChange={this.handleChange} type="email"/>
                    </label>
                    <label>
                        <input name="password" value={this.state.password} onChange={this.handleChange} type="password" />
                    </label>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
