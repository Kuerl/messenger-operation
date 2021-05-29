import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/createTeam.css';

const CreateTeam = () => {
    const [title, setTitle] = useState('');
    const [member, setMember] = useState('');
    const cookie = new Cookies();
    // Create Team:
    const createTeam = async (e) => {
        e.preventDefault();
        console.log(e);
        await axios({
            method: 'post',
            url: 'http://localhost:5000/'+cookie.get('username')+'/createteam',
            headers: {},
            data: {
                username: cookie.get('username'),
                title: title,
                member: member
            }
        })
        .then(res => {
            console.log(res.data);
            window.alert(res.data);
        })
    }
    return (
        <div className="create">
            <h3>Create Team View</h3>
            <form onSubmit={createTeam}>
                <input value={member} onChange={
                    (e) => {
                        setMember(
                            e.target.value
                        );
                        console.log(member);
                    }} placeholder='enter a username' type='text' name='member'/><br />
                <input value={title} onChange={
                    (e) => {
                        setTitle(
                            e.target.value
                        );
                        console.log(title);
                    }} placeholder='enter a title' type='text' name='title'/><br />
                <button>Create Team</button>
            </form>
        </div>
    );
}

export default CreateTeam;