import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie'
import {Redirect, withRouter} from 'react-router-dom'


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
                <Redirect to ='/users'/>
                return res.json()
            }
            else if(res.status==403){alert('Incorrect email id')}
            else if(res.status===401){alert('incorrect password')}
            else{
                const err=new Error(res.err);
                console.log(err+'err')
                alert('incorrect email or password') 
            }
        })
        .then(data=>{
            /* localStorage.setItem("AccessToken", data.AccessToken) */
            const cookies=new Cookies();
            cookies.set('cookie', data.AccessToken, {path:'/', maxAge:360000});
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
