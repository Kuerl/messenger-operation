import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import {axios} from '../util/axios';

import { onChangeText } from "../util/util";

import '../css/login.css'
import qrcode from '../img/1622950891.png';

const Login = () => {
    const [state, setState] = useState({username: '', password: '', login: false, token: ''});
    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        let response = await axios.post('/login', 
            {
                username: state.username,
                password: state.password
            })
            .catch(err => window.alert(err));
        console.log(response);
        if (response.data.login === true) {
            setState(prevState => ({
                ...prevState,
                login: response.data.login,
                token: response.data.token
            }));
            setCookie('username', state.username, {path: '/'});
            setCookie('Auth', state.token, {path: '/'});
            setRedirect(true);
        }
        window.alert(response.data.message);
    }

    if (redirect === true || cookies !== null) {
        return <Redirect to='/' />
    }
    
    return (
        <div className="login">
            <div className="login__formview">
                <div className="login__formview__content">
                        <h3>Welcome to Messenger Operation</h3>
                        <span style={{marginBottom: '5px'}}>A mini project of Web Application subject - React - ExpressJS - Postgresql</span>
                        <form onSubmit={handleLogin}>
                            <label>USERNAME OR EMAIL</label>
                            <input value={state.username} type='text' name='username' onChange={e=>onChangeText(e, setState)} /><br />
                            <label>PASSWORD</label>
                            <input value={state.password} type='password' name='password' onChange={e=>onChangeText(e, setState)} /><br />
                            <button type='submit'>LOGIN</button>
                        </form>
                        <div><span>Need an account? </span><a href="/register" id='register'>Register</a></div>
                </div>
                <div className="login__formview_quote">
                        <img src={qrcode}/>
                        <span>You can follow us by scan this QR code</span>
                        <div><span>From: </span><a href='http://github.com/kuerl'>Kuerl</a></div>
                </div>
            </div>
        </div>
    );
}

export default Login;