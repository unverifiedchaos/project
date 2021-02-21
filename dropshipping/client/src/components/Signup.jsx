import React from 'react';
import PropTypes from 'prop-types';

class Signup extends React.Component {

    state={
        name:'',
        email:'',
        password:'',
        gender:''
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitForm=(e)=>{
        e.preventDefault();
        fetch('http://localhost:8080/signup' ,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                <h1>SignUp</h1>
                <form onSubmit={this.submitForm}>
                    <label>
                    Name:<input name="name" value={this.state.name} onChange={this.onChange} type='text' />
                    </label>
                    <label>
                    email:<input name="email" value={this.state.email} onChange={this.onChange} type='email' />
                    </label>
                    <label>
                    Password:<input name="password" value={this.state.password} onChange={this.onChange} type='password' />
                    </label>
                    <label>
                    Gender:<input name="gender" value={this.state.gender} onChange={this.onChange} type='text' />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

Signup.propTypes = {};

export default Signup;
