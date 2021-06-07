import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

import { axios } from '../util/axios';

import '../css/register.css';

const Register = () => {
    const [register, setRegister] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    // Create Account:
    const handleRegister = async (e) => {
        e.preventDefault();
        if (register.username == null || register.password == null || register.email == null || register.firstname == null || register.lastname == null) {
            return window.alert('Please fill all of information!');
        };
        let response = await axios.post('/register', {
            username: register.username,
            email: register.email,
            password: register.password,
            firstname: register.firstname,
            lastname: register.lastname
        })
        .catch(err => window.alert(err));
        if (response.data.register) {
            setRedirect(true);
        }
        window.alert(response.data.message);
    }

    // Check register cookies:
    if (cookies !== null) {
        return <Redirect to='/' />
    }

    // Redirect
    if (redirect) {
        return <Redirect to='/login' />
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