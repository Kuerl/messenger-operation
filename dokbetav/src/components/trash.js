import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
import CreateTeam from './createTeam';
import '../css/home.css';
import io from 'socket.io-client';
import ReactScrollableFeed from 'react-scrollable-feed';
const socket = io('localhost:5000');

const cookie = new Cookies();
const Home = () => {
    if (cookie.get('username')===null){
        return < Redirect to='/login' />;
    }
    return (
        <div className='home'>
            <div id='home__welcome'><h1>Welcome {cookie.get('username')} to DOKBetaV0</h1></div>
            <div>                    
                <TeamsList />
            </div>
        </div>
    );
}

const TeamsList = () => {
    const [channel, setChannel] = useState([]);
    const [team, setTeam] = useState([]);
    const [team_id, setTID] = useState(null);
    const [channel_id, setCID] = useState(null);
    const [message, setMessage] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [display, setDisplay] = useState('none');
    const [transf, setTransf] = useState('');
    // color:
    const color = (x) => {
        console.log(x);
        if (x.toLowerCase() === cookie.get('username').toLowerCase()) {
            return {color: "red"}
        } else {
            return {color: "black"}
        }
    }
    // Get Messages:
    const getMessages = (channel_id) => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/'+cookie.get('username')+'/'+team_id+'/'+channel_id,
            headers: {},
        })
        .then(res => {
            console.log(res.data);
            setMsgList(res.data);
        });
    }
    // Send Message:
    const sendMessage = async (e) => {
        e.preventDefault();
        if (message === '') {
            return ;
        }
        await axios({
            method: 'post',
            url: 'http://localhost:5000/'+cookie.get('username')+'/'+team_id+'/'+channel_id,
            headers: {},
            data: {
                message_att: false,
                message_: message,
                username: cookie.get('username'),
                contact_id: null,
                att_id: null,
                channel_id: channel_id,
            }
        })
        .then(res => {
            console.log(res.data);
        });
        setMessage('');
    }
    // Get Teams:
    const getTeams = async () => {
        // e.preventDefault();
        axios({
            method: 'get',
            url: 'http://localhost:5000/'+cookie.get('username')+'/getteam',
            headers: {},
            data: {username: cookie.get('username')}
        })
        .then(res => {
            setTeam(res.data.teamList);
        })
    }
    // Get Channel
    const getChannels = (team_id) => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/'+cookie.get('username')+'/'+team_id,
            headers: {},
            data: {
                username: cookie.get('username'),
                team_id: team_id
            }
        })
        .then(res => {
            setChannel(res.data.channelList);
            console.log(channel);
        })
    }
    // Sub:
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server!');
        });
        socket.on("DOKBetaV0/"+channel_id+"/client", (data) => {
            console.log(data);
            setMsgList(prevState => (
                [...prevState, data]    
            ));
        });
        getTeams();
    }, [channel_id]);
    return (
        <div className='home__'>
            <div className='home__team'>
                {team.map((item) =>
                    <button value={item.team_id} type='submit' key={item.team_id} onClick={() => {getChannels(item.team_id); setTID(item.team_id); setDisplay('none'); setTransf(item.title);}}>
                        {(item.title).split("-*khmluerl*-")[0]}
                    </button>
                )}
            </div>
            {/* -------------------------------------- */}
            <div className='home__channel'>
                <h3>{transf.split("-*khmluerl*-")[0]}</h3>
                <div className='home__create'>
                    <form>
                        <button>Add member</button>
                    </form>
                    <form>
                        <button>Add Channel</button>
                    </form>
                </div>
                <div className='home__channel__'>
                    {channel.map((item =>
                        <button value={item.title} onClick={() => {
                            setCID(item.id);
                            console.log(item.id);
                            if((item.title).split("-*khmluerl*-")[0] !== 'voice') {setDisplay('block');}
                            else{setDisplay('none')}
                            getMessages(item.id)}
                        }>
                            {(item.title).split("-*khmluerl*-")[0]}
                        </button>
                    ))}
                </div>
                <div>
                    <CreateTeam />
                </div>
            </div>
            <div className="home__msgV">
                <div style={{display: display}}>
                    <div className='msg_View'>
                        <ReactScrollableFeed>
                            {msgList.map((item) =>
                                <div id='notBAD'>
                                    <label style={color(item.username)} id='username'>{item.username}</label><br />
                                    <span> {item.message}</span>
                                    <hr />
                                </div>
                            )}
                        </ReactScrollableFeed>
                    </div>
                    <form onSubmit={sendMessage}>
                        <input type='text' placeholder='Enter your message!' value={message} onChange={e=>{setMessage(e.target.value);}}/>
                        <button>Send!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;