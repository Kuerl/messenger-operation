import '../css/home.css';
import '../css/home__channel.css';
import '../css/home__message.css';

import { useCookies } from "react-cookie";

import Team from './teams';
import Channel from './channels';
import { getChannelPagination } from './channels';
import Message from './messages';
import JitsiComponent from './call';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

const Home = ({redirect, setRedirect}) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [paginationChannel, setPaginationChannel] = useState(
                                    {team: {title: ''},
                                    channel: null,
                                    channel_type: true,
                                    members: []});
    const [members, setMembers] = useState([{username: 'ABC'}, {username: 'XYZ'}]);

    // if (Object.keys(cookies).length === 0) {
    //     console.log('-----------------------------------');
    //     return <Redirect to='/login' />;
    // }

    switch (redirect) {
        case 1:
            break;
        case 0:
            console.log(Object.keys(cookies).length !== 0);
            if (Object.keys(cookies).length !== 0) {
                setRedirect(1);
            } else {
                return <Redirect to='/login' />;
            }
        case -1:
            return <Redirect to='/register' />;
    }

    const navChannel = (e) => {
        setPaginationChannel(prevState => ({...prevState, team: e}))
    };

    console.log(paginationChannel);

    const navMessage = (e) => {
            setPaginationChannel(prevState => ({...prevState, channel: e.channel,
                                                 channel_type: e.channel_type, members: e.members})) // At click
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
                            <Channel Team={paginationChannel} navMessage={(e) => navMessage(e)}/>
                        </div>
                    </div>
                    <div className='home__msgarea__msg'>
                        {
                        (paginationChannel.channel_type == null || paginationChannel.channel_type) ?
                        <Message paginationMessage={paginationChannel}/> 
                        :
                        <JitsiComponent roomID={paginationChannel.channel.title} userName={cookies.username}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;