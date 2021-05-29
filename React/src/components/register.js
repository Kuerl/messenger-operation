import React, { Component, useState } from 'react';
import '../css/register.css';
import axios from 'axios';

const Register = () => {
    const [register, setRegister] = useState({});
    // Create Account:
    const createAccount = (e) => {
        e.preventDefault();
        if (register.username == null || register.password == null || register.email == null || register.firstname == null || register.lastname == null) {
            return window.alert('PLEASE FILL ALL OF INFORMATION!');
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/register',
            headers: {},
            data: {
                username: register.username,
                email: register.email,
                password: register.password,
                firstname: register.firstname,
                lastname: register.lastname
            }
        })
        .then(res => {
            window.alert(res.data);
        })
    }
    return (
        <div className="register">
            <div className="register__">
                <h1>Register An Account</h1>
                <form onSubmit={createAccount}>
                    <input placeholder='Username' value={register.username} onChange={e=>setRegister(prevState => ({...prevState, username: e.target.value}))}/>
                    <input placeholder='Email' value={register.email} onChange={e=>setRegister(prevState => ({...prevState, email: e.target.value}))}/>
                    <input placeholder='First name' value={register.firstname} onChange={e=>setRegister(prevState => ({...prevState, firstname: e.target.value}))}/>
                    <input placeholder='Last name' value={register.lastname} onChange={e=>setRegister(prevState => ({...prevState, lastname: e.target.value}))}/>
                    <input placeholder='Password' type='password' value={register.password} onChange={e=>setRegister(prevState => ({...prevState, password: e.target.value}))}/>
                    <button type="submit">Register</button>
                </form>
                <a href='/login'>Login</a>
            </div>
        </div>
    );
}

export default Register;