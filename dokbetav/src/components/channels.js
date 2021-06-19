import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { axios } from "../util/axios";
import socket from '../util/socket';

import {FaPlus} from 'react-icons/fa';
import {IoIosPersonAdd, IoIosSettings} from 'react-icons/io';

import ChannelCreate from "./Pop-up/createChannels";

import '../css/home__channel.css';


const Channel = ({ Team, navMessage }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [pagination, setPagination] = useState({text: [], voice: [], active: null, active_type: true});
    let active_type = true;
    const [popup, setPopup] = useState(false);

    const getChannels = async () => {
        let response = await axios.get('/'+cookies.username+'/'+Team.team.id);
        setPagination(prevState => ({
            ...prevState,
            text: response.data.text,
            voice: response.data.voice,
            active: response.data.text[0]
        }));
        // First Look:
        console.log(response.data.text[0].id);
        let members = await getChannelParticular(response.data.text[0].id);
        let data = {channel: response.data.text[0], members: members}
        navMessage(data);
    }

    const getChannelParticular = async (e) => {
        let response;
            response = await axios.get('/'+cookies.username+'/'+Team.team.id+'/'+e);
        // let response = await axios.get('/'+cookies.username+'/'+Team.team.id+'/'+pagination.active.id);
        return response.data;
    }

    const NavToMsg = async (e) => {
        let members = await getChannelParticular(e.id);
        let data = {channel: e, channel_type: active_type, members: members}
        navMessage(data);
    }

    useEffect(() => {
        if (Team.team.id !== undefined) {
            getChannels();
            socket.on();
        }
    }, [Team.team.id]);

    console.log(pagination);

    return (
        <div className='channel'>
            <div className='channel__text'>
                <div className='channel__text__title'>
                    <label>
                        Text Channels
                    </label>
                    <button title='Add Text Channel'
                        onClick={() => {
                            setPopup(true);
                        }}
                    >
                        <FaPlus id='addtextchannel' size="1.5em" color='#E1ECF3'/>
                    </button>
                </div>
                <div className=''>
                    {
                        pagination.text.map(item => (
                            <div className='channel__text__channel' key={item}>
                                <button
                                    onClick={() => {
                                        setPagination(prevState => ({
                                            ...prevState,
                                            active: item,
                                            active_type: true,
                                        }));
                                        getChannelParticular(item.id);
                                        active_type = true;
                                        NavToMsg(item);
                                    }}
                                >
                                    <label className={pagination.active.id === item.id ? 'channel__pos' : 'channel__neg'}>
                                        {item.title.split('-*khmluerl*-')[0]}
                                    </label>
                                </button>
                                <div className={item.id === pagination.active.id ? 'channel__text__channel__setting' : 'channel__s__neg'}>
                                    <button title='Add Members'>
                                        <IoIosPersonAdd size='1.2em' color='white'/>
                                    </button>
                                    <button title='Setting'>
                                        <IoIosSettings size='1.2em' color='white'/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='channel__voice'>
                <div className='channel__voice__title'>
                    <label>
                        Voice Channels
                    </label>
                    <button title='Add Voice Channel'
                        onClick={() => {
                            setPopup(true);
                        }}
                    >
                        <FaPlus size="1.5em" color='#E1ECF3'/>
                    </button>
                </div>
                <div>
                    {
                        pagination.voice.map(item => (
                            <div className='channel__text__channel' key={item}>
                                <button onClick={() => {
                                        setPagination(prevState => ({
                                            ...prevState,
                                            active: item,
                                            active_type: false
                                        }));
                                        getChannelParticular(item.id);
                                        active_type = false;
                                        NavToMsg(item);
                                    }}
                                >
                                    <label className={pagination.active.id === item.id ? 'channel__pos' : 'channel__neg'}>
                                        {item.title.split('-*khmluerl*-')[0]}
                                    </label>
                                </button>
                                <div className={item.id === pagination.active.id ? 'channel__text__channel__setting' : 'channel__s__neg'}>
                                    <button title='Add Members'>
                                        <IoIosPersonAdd size='1.2em' color='white'/>
                                    </button>
                                    <button title='Setting'>
                                        <IoIosSettings size='1.2em' color='white'/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Create Channel! */}
            <div>
                <ChannelCreate popup={popup} setPopup={e => setPopup(e)} team_id={Team.team.id}/>
            </div>

        </div>
    );
}
 
export default Channel;