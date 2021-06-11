import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { axios } from "../util/axios";

import {FaPlus} from 'react-icons/fa';
import {IoIosPersonAdd, IoIosSettings} from 'react-icons/io';

import '../css/home__channel.css';


const Channel = ({ Team, navMessage }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [pagination, setPagination] = useState({
        text: [],
        voice: [],
        active: null
    });

    const getChannels = async () => {
        let response = await axios.get('/'+cookies.username+'/'+Team.team.id);
        setPagination(prevState => ({
            ...prevState,
            text: response.data.channelList.text,
            voice: response.data.channelList.voice,
            active: response.data.channelList.text[0]
        }));
        console.log(response);
    }

    // if (Team.team.id !== undefined && pagination.active === null) {
    //     getChannels();
    // }

    useEffect(() => {
        if (Team.team.id !== undefined) {
            getChannels();
        }
    }, [Team.team.id]);

    return (
        <div className='channel'>
            <div className='channel__text'>
                <div className='channel__text__title'>
                    <label>
                        Text Channels
                    </label>
                    <button>
                        <FaPlus id='addtextchannel' size="1.5em" color='#E1ECF3'/>
                    </button>
                </div>
                <div className=''>
                    {
                        pagination.text.map(item => (
                            <div className='channel__text__channel' key={item}>
                                <button>
                                    <label style={{color: 'white'}}>
                                        {item.title.split('-*khmluerl*-')[0]}
                                    </label>
                                </button>
                                <div className='channel__text__channel__setting'>
                                    <button>
                                        <IoIosPersonAdd size='1.2em' color='white'/>
                                    </button>
                                    <button>
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
                    <button>
                        <FaPlus size="1.5em" color='#E1ECF3'/>
                    </button>
                </div>
                <div>
                    {
                        pagination.voice.map(item => (
                            <div className='channel__text__channel' key={item}>
                                <button>
                                    <label style={{color: 'white'}}>
                                        {item.title.split('-*khmluerl*-')[0]}
                                    </label>
                                </button>
                                <div className='channel__text__channel__setting'>
                                    <button>
                                        <IoIosPersonAdd size='1.2em' color='white'/>
                                    </button>
                                    <button>
                                        <IoIosSettings size='1.2em' color='white'/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Channel;