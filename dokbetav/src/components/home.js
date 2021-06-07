import '../css/home.css';
import '../css/home__channel.css';
import '../css/home__message.css';

import Cookies from 'universal-cookie';

import Team from './teams';

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

const Home = () => {

    const cookies = new Cookies();
    const history = useHistory();

    // if (!authorized) {
    //     return <Redirect to='/login' />;
    // }

    return (
        <div className='home'>
            <div className='layer'>
                <div className='LOGO'>
                    <span>DOKBetaV0</span>
                </div>
                <div>
                    <span className='USERNAME'>
                        Wellcome {cookies.get('username')}!
                    </span>
                </div>
                <div className='home__teams'>
                    <Team />
                </div>
                <div className='home__msgarea'>
                    <div className='home__msgarea__channel'>
                        <div className='home__msgarea__channel__title'>
                            
                        </div>
                        <div className='home__msgarea__channel__channelview'>

                        </div>
                    </div>
                    <div className='home__msgarea__msg'>
                        <div className='home__msgarea__msg__nav'>

                        </div>
                        <div className='home__msgarea__msg__msgview'>
                            <div className='home__msgarea__msg__msgview__'>

                            </div>
                            <div className='home__msgarea__members'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;