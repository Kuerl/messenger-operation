import React, { useState } from 'react';
import '../css/register.css';
import axios from 'axios';
import { axiosURL } from '../constants/const';

const Register = () => {
    const [register, setRegister] = useState({});
    // Create Account:
    const handleRegister = (e) => {
        e.preventDefault();
        if (register.username == null || register.password == null || register.email == null || register.firstname == null || register.lastname == null) {
            return window.alert('Please fill all of information!');
        }
        axios({
            method: 'post',
            url: axiosURL+'/register',
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
            window.alert(res.data.message);
        })
    }
    return (
        <div className="register">
            <div className="register__form">
                <h1>Register an account?</h1>
                <form onSubmit={handleRegister}>
                    <label>USERNAME</label>
                    <input value={register.username} onChange={e=>setRegister(prevState => ({...prevState, username: e.target.value}))}/>
                    <label>EMAIL</label>
                    <input value={register.email} onChange={e=>setRegister(prevState => ({...prevState, email: e.target.value}))}/>
                    <label>FIRST NAME</label>
                    <input value={register.firstname} onChange={e=>setRegister(prevState => ({...prevState, firstname: e.target.value}))}/>
                    <label>LAST NAME</label>
                    <input value={register.lastname} onChange={e=>setRegister(prevState => ({...prevState, lastname: e.target.value}))}/>
                    <label>PASSWORD</label>
                    <input type='password' value={register.password} onChange={e=>setRegister(prevState => ({...prevState, password: e.target.value}))}/>
                    <button type="submit">REGISTER</button>
                </form>
                <div><span>Already have an account? </span><a href='/login'>Login</a></div>
            </div>
        </div>
    );
}

export default Register;