import '../css/home.css';
import '../css/home__channel.css';
import '../css/home__message.css';

import { useCookies } from "react-cookie";

import Team from './teams';
import Channel from './channels';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

const Home = () => {
    const [cookies, setCookie] = useCookies(['user']);

    const [paginationChannel, setPaginationChannel] = useState({team: {title: ''}, channel: null});

    if (Object.keys(cookies).length === 0) {
        return <Redirect to='/login' />;
    }

    
    const navChannel = (e) => {
        setPaginationChannel(prevState => ({...prevState, team: e}))
    };

    const navMessage = (e, channelList) => {
        paginationChannel.channel === null ? 
            setPaginationChannel(channelList[0]) : // At the first channel
            setPaginationChannel(prevState => ({...prevState, channel: e.target.value})) // At click
    }

    return (
        <div className='home'>
            <div className='layer'>
                <div className='LOGO'>
                    <span>DOKBetaV0</span>
                </div>
                <div>
                    <span className='USERNAME'>
                        Wellcome<label className="USNAMELABEL"> {cookies.username}</label>!
                    </span>
                </div>
                <div className='home__teams'>
                    <Team paginationChannel={paginationChannel} navChannel={e => navChannel(e)}/>
                </div>
                <div className='home__msgarea'>
                    <div className='home__msgarea__channel'>
                        <div className='home__msgarea__channel__title'>
                            {paginationChannel.team.title.split('-*khmluerl*-')[0]}
                        </div>
                        <div className='home__msgarea__channel__channelview'>
                            <Channel Team={paginationChannel} navMessage={(e) => navMessage(e)} />
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