import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { axios } from "../util/axios";
import socket from '../util/socket';

import '../css/home__message.css';

import {FaHashtag} from 'react-icons/fa';

const Message = ({ paginationMessage }) => {
    return(
        <>
            <div className='home__msgarea__msg__nav'>

            </div>
            <div className='home__msgarea__msg__msgview'>
                <div className='home__msgarea__msg__msgview__'>
                    <MessageView paginationMessage={paginationMessage} />
                </div>
                <div className='home__msgarea__members'>
                    {
                        paginationMessage.members.map(item => 
                            <div key={item.username} className='msg__div'>
                                <div className='msg__div__user'>
                                    <FaHashtag /><button>{item.username}</button>
                                </div>
                                <div className='msg__div__status'>
                                    {item.status}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

const MessageView = ({paginationMessage}) => {
    const [cookies, setCookie] = useCookies(["user"]);
    const [message, setMessage] = useState([{username: '', message: ''}]);
    const [sendMsg, setSendMsg] = useState({channel: null, message: ''});

    const getMessages = async () => {
        let response = await axios.get('/'+cookies.username+'/'+paginationMessage.team.id+'/'+paginationMessage.channel.id+'/t').catch(error => console.log(error));
        setMessage(response.data);

        // SOCKET HANDLE
        console.log('----------------', sendMsg);
        if (paginationMessage.channel !== null) {
            console.log('SUB: ', paginationMessage.channel.id);
            socket.off(sendMsg.channel);
            socket.on(paginationMessage.channel.id+'', data => {
                setMessage(prevState => [...prevState, data]);
            });
        }
        setSendMsg(prevState => ({...prevState, channel: paginationMessage.channel.id}))
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post(
            '/'+cookies.username+'/'+paginationMessage.team.id+'/'+paginationMessage.channel.id+'/t',
            {
                message_att: false,
                message: sendMsg.message,
                contact_id: null,
                att_id: null
            }
        )
        .catch(error => console.log(error));
        setSendMsg(prevState => ({...prevState, message: ''}));
    }

    useEffect(() => {
        if (paginationMessage.channel !== null) {
            getMessages();
        }
    }, [paginationMessage]);

    return (
        <>
            <div className='msgV__view' id='sc4'>
                {
                    message.map(item => 
                        <div className='msg__view__msg' key={item}>
                            <div className='msg__view__msg__logo'>
                                <FaHashtag size='1.6em' color={item.username === cookies.username ? '#68ED9E' :'white'}/>
                            </div>
                            <div className='msg__view__msg__'>
                                <div className='msg__view__msg__usname'>
                                    {item.username}
                                </div>
                                <div>
                                    {item.message}
                                </div>
                            </div>
                        </div>    
                    )
                }
            </div>
            <div >
                <form onSubmit={(e) => sendMessage(e)} className='msgV__send'>
                    <input value={sendMsg.message} onChange={(e) => {
                        setSendMsg(prevState => ({...prevState, message: e.target.value}));
                    }} placeholder='Enter your messages'/>
                    <button>
                    </button>
                </form>
            </div>
        </>
    );
}

export default Message;