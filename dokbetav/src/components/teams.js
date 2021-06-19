import { useEffect, useState } from 'react';
import { axios } from "../util/axios";
import { useCookies } from "react-cookie";
import {FaPlus, FaGlobeAsia} from 'react-icons/fa';

import TeamCreate from './Pop-up/createTeam';

import '../css/home__team.css';
import socket from '../util/socket';

const Team = ({paginationChannel,navChannel}) => {
    const [cookies] = useCookies(['user']);
    const [pagination, setPagination] = useState([]);
    const [button, setButton] = useState(-1);

    console.log(pagination);

    const [popup, setPopup] = useState(false);

    const getTeams = async () => {
        let response = await axios.get('/'+cookies.username).catch(err => console.log(err));
        setPagination(response.data.TeamsList);
        if (paginationChannel.team.title === '' && response.data.TeamsList.length !== 0) {
            navChannel(response.data.TeamsList[0])
        }
        else {
            navChannel({title: 'NO TEAM AVAILABE'});
        }
    }

    useEffect(() => {
        getTeams();
        socket.on(cookies.username, data => {
            if (data) {
                getTeams();
            }
        });
    }, []);

    return(
        <div className='home__teams__implement'>
            <div className='SCROLL'>
                <div className='home__teams__btnarea'>
                    <input className={button === 0 ? 'button__pos' : 'button__neg'}
                        type='button' id='LOGOK'
                        onClick={() => {setButton(0); window.alert('Your are login with username: '+cookies.username)}}
                    />
                </div>
                <hr />
                    {pagination.map((item) => 
                        <div title={item.id} className='home__teams__btnarea' key={item.title}>
                            <button
                                className={(paginationChannel.team.id === item.id && button=== -1) ? "button__pos" : "button__neg"}
                                value={item} onClick={() => {
                                    for (let i = 0; i < pagination.length; i++) {
                                        const element = pagination[i];
                                        if (item.id === element.id) {
                                            navChannel(pagination[i])
                                        }}
                                        paginationChannel.team.id === item.id ? console.log('button__pos') : console.log('button__neg');
                                        setButton(-1)}
                                }
                            >
                                {item.title[0]}
                            </button>
                        </div>
                    )}
                <hr />
                <div  className='home__teams__btnarea'>
                    <button className={button === 1 ? 'button__pos' : 'button__neg'} onClick={() => setButton(1)}>
                        <FaGlobeAsia />
                    </button>
                </div>
                <div className='home__teams__btnarea'>
                    <button className={button === 2 ? 'button__pos' : 'button__neg'} onClick={() => {setButton(2); setPopup(true)}}>
                        <FaPlus />
                    </button>
                </div>
            </div>

            {/* POPUP AREA */}
            <div><TeamCreate
                popup={popup} 
                setPopup={(e) => setPopup(e)}
                setButton={e => {setButton(e)}}
            /></div>
        </div>
    );
}

export default Team;