import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'


class Login extends React.Component {
    state={
        email:'',
        password:'',
    }
    
    handleChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    
/*     handleSubmitInput=()=>{
        this.props.parent(this.state.token)
    } */

    handleSubmit=(e)=>{
        e.preventDefault()
        fetch('http://localhost:8080/auth/login', {
            withCredentials:true,
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.state),
        })
        .then(res=>{
            if(res.ok){
                this.props.history.push('/users')
                return res.json()
            }else{
                const err=new Error(res.err);
                console.log(err+'err')
                alert('incorrect email or password') 
            }
        })
        .then(data=>{
            localStorage.setItem("AccessToken", data.AccessToken)
            console.log(localStorage.getItem("AccessToken")+'accesstoken')
        })
        .catch(err=>console.log(err+'error'))
    }

    render() {
        return (
            <div>
                {/* input test */}
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <label>
                        Email:<input name="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                    </label>
                    <label>
                        Password:<input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {};


export default withRouter(Login);
