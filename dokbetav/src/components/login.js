import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import '../css/login.css'
import icon from '../img/icon.jpg';

const Login = () => {

    const cookie = new Cookies();

    const [state, setState] = useState(
        {
            username: '',
            password: '',
            login: false,
            token: ''
        }
    );

    const onChangeText = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
            })
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            username: state.username,
            password: state.password
        };
        // const url = 'http://127.0.0.1:5000/login';
    
        await axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            headers: {}, 
            data: post
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
                console.log(state);
                return (<Redirect to='/register'/>);
            }
        })
        .catch(err=>console.log(err));
    }
    
    return (
        <div className="login">
            <div className="login__quote">
                <img src={icon}/>
                <h3>Follow us: <a href="fb.com/kuerl.1401">here</a></h3>
            </div>
            <div className="login__">
                <h1>Welcome to Messenger Operation</h1>
                <span>Nice to meet you!</span>
                <form onSubmit={handleSubmit}>
                    <input value={state.username} type='text' name='username' placeholder='username' onChange={e=>onChangeText(e)} /><br />
                    <input value={state.password} type='password' name='password' placeholder='password' onChange={e=>onChangeText(e)} /><br />
                    <button type='submit'>Login</button>
                </form>
                <a href="/register" id='register'>Register</a><a href="/" id='register'>HOME</a>
            </div>
        </div>
    );
}

export default Login;