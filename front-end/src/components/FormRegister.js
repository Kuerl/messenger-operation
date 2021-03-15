import React from 'react';
import '../stylesheets/main.css'

const Register = () => {
    return (
        <div className='__main__login__login__form'>
            <form>
                 <label htmlFor='username'>USERNAME</label><input />
                 <label htmlFor='email'>E-MAIL</label><input />
                 <label htmlFor='password'>PASSWORD</label><input type='password' />
                 <label htmlFor='repassword'>CONFIRM PASSWORD</label><input type='password' />
                 <div id='agree'><input type='checkbox'/><span>Agree with your rules?</span></div>
                 <button className='__main__login__login__btn' type='submit'>Sign Up</button>
            </form>
         </div>
    );
}

export default Register;