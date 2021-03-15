import React, { useState } from 'react';
import '../stylesheets/main.css';
import QrCode from '../img/frame.png';
import Logo from '../img/851.png';
import Register from  './FormRegister.js';
import Login from './FormLogin.js';

const Desciption = () => {
    return(
        <div className='__main__login__desc__'>
            <img src={QrCode} alt='qrCode' />
            <h3>You can follow us by scanning this QR Code</h3>
            <span>That will place the quotes!</span>
        </div>
    );
}

const LoginPage = () => {
    const [form, setForm] = useState('login');
    return (
        <div className='__main'>
            <div id='LogoImgArea'><img id='LogoImg' src={Logo} alt='Logo'/><label id='LogoLabel'>KUERL</label></div>
            <div>
                {
                    form === 'login' ?
                    <div className='__main__login'>
                        <div className='__main__login__desc'>
                            <Desciption />
                        </div>
                        <div className='__main__login__login'>
                            <h1>Wellcome back!</h1>
                            <p>Nice to meet you again.</p>
                            <Login />
                            <div className='__main__login__login__span'><span>Sign up and enjoy it <button onClick={()=>{setForm('register')}}>register?</button></span></div>
                        </div>
                    </div>
                    :
                    <div id='register' className='__main__login__login'>
                        <h1>Wellcome to our Platform!</h1>
                        <p>Sign up and try it.</p>
                        <Register />
                        <div className='__main__login__login__span'><span>Sign up and enjoy it <button onClick={()=>{setForm('login')}}>Already having an account?</button></span></div>
                    </div>
                }
            </div>
        </div>
    );
}

export default LoginPage;