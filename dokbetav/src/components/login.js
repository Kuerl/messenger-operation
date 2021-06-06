import { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";
import { onChangeText } from "../util/util";
import { axiosURL } from "../constants/const";
import '../css/login.css'
import qrcode from '../img/1622950891.png';

const Login = () => {
    const cookie = new Cookies();
    const [state, setState] = useState(
        {username: '', password: '', login: false, token: ''});

    const handleLogin = async (e) => {
        e.preventDefault();
    
        await axios({
            method: 'post',
            url: axiosURL+'/login',
            headers: {}, 
            data: {
                username: state.username,
                password: state.password
            }
        })
        .then(res=>{
            setState(prevState => ({
                ...prevState,
                login: res.data.login,
                token: res.data.token
            }));
            if (state.login) {
                cookie.set('username', state.username, { path: '/' });
                cookie.set('token', state.token, { path: '/' });
                console.log(res.data);
            }
            else {
                console.log(res.data);
                window.alert(res.data.message);
            }
        })
        .catch(err=>console.log(err));
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