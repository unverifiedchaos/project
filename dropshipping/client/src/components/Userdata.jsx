import React from 'react';
import PropTypes from 'prop-types';

class Userdata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const token=localStorage.getItem('AccessToken')
        fetch('', {
            method:"POST",
            headers:{
                "Content-Type":"apllication/json",
                'Authorization':` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzExZmQ5YzQ4M2EyMGQxOTU0NzE1ZSIsIm5hbWUiOiJzYWlmIiwiZ2VuZGVyIjoiTWFsZSIsImlhdCI6MTYxNDY3NjY5MSwiZXhwIjoxNjE0NjgwMjkxfQ.sLMdqlbUl82SFLf1jGAYmg2QHQub2SFp4BcNQeerM1w`
            },
        })
        .then(res=>{
            console.log(JSON.stringify(res.body))
        })
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                sup
            </div>
        );
    }
}

Userdata.propTypes = {};

export default Userdata;
