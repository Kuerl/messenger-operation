import { useEffect, useState } from 'react';
import { axios } from "../util/axios";
import { useCookies } from "react-cookie";

import '../css/home__team.css';

const Team = ({paginationChannel,navChannel}) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [pagination, setPagination] = useState([]);

    const [button, setButton] = useState(null);

    const getTeams = async () => {
        let response = await axios.get('/'+cookies.username).catch(err => console.log(err));
        setPagination(response.data.TeamsList);
        if (paginationChannel.team.title === '') {
            navChannel(response.data.TeamsList[0])
        }
    }

    console.log(paginationChannel);

    useEffect(() => {
        getTeams();
    }, [paginationChannel]);

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
                        Public
                    </button>
                </div>
                <div className='home__teams__btnarea'>
                    <button className={button === 2 ? 'button__pos' : 'button__neg'} onClick={() => {setButton(2)}}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Team;