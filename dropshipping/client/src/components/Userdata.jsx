import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import {Redirect} from 'react-router'
import Cookies from 'universal-cookie';


class Userdata extends React.Component {

    state={
        user:[]
    }

    componentDidMount(){
        const cookies=new Cookies()
        const cookie=cookies.get('cookie')
        fetch('http://localhost:8080/auth/verify',{
            headers:{'Authorization' : `Bearer ${cookie}`}
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            this.setState({user:data})
            this.setState({posts:data.post})
        })
    }

    render() {

        const cookies=new Cookies()
        const isLogged=cookies.get('cookie')

        if(!isLogged){
            return(
                <Redirect to="/login"/>
            )
        }

        const user=this.state.user
        return (
/*             posts.map(user=>{
                <p>{user}</p>
            }) */
            <div>
                <p>{user.name}</p>
                <p>{user.gender}</p>
                <p>{user.email}</p>
            </div>    
        )
    }
}

Userdata.propTypes = {};

export default Userdata;
