import '../css/home__message.css';
import {FaHashtag} from 'react-icons/fa';
import {RiSendPlane2Fill} from 'react-icons/ri';
import { axios } from "../util/axios";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

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


    console.log(message);

    const getMessages = async () => {
        let response = await axios.get('/'+cookies.username+'/'+paginationMessage.team.id+'/'+paginationMessage.channel.id+'/t').catch(error => console.log(error))
        setMessage(response.data);
    }

    useEffect(() => {
        if (paginationMessage.channel !== null) {
            getMessages();
        }
    }, [paginationMessage]);

    return (
        <>
            <div className='msgV__view'>
                {
                    message.map(item => 
                        <div className='msg__view__msg'>
                            <div className='msg__view__msg__logo'>
                                <FaHashtag size='1.6em' color={item.username === cookies.username ? '#68ED9E' :'white'}/>
                            </div>
                            <div className='msg__view__msg__'>
                                <div>
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
            <div className='msgV__send'>
                <input placeholder='Enter your messages'/>
                <button >
                </button>
            </div>
        </>
    );
}

export default Message;