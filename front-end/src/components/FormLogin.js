import React from 'react';
import '../stylesheets/main.css';
import {Link} from 'react-router-dom';

const Login = () => {
    return (
        <div className='__main__login__login__form'>
            <form>
                 <label htmlFor='username'>USERNAME</label><input />
                 <label htmlFor='password'>PASSWORD</label><input type='password' />
                 <button id='forgot'>Forgot my password?</button>
                 <button className='__main__login__login__btn' type='submit'><Link id='link' to='/t'>Login</Link></button>
            </form>
         </div>
    );
}

export default Login;