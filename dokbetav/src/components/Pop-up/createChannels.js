import React, {useState} from 'react';
import { useCookies } from "react-cookie";

import'../../css/Pop-up/createchannel.css';

import { axios } from '../../util/axios';

import { GiCrossedBones } from "react-icons/gi";
import { async } from 'regenerator-runtime';

const ChannelCreate = ({ popup, setPopup, team_id }) => {
    const [state, setState] = useState({type_: true, title: ''});
    const [cookies, setCookie] = useCookies(['user']);
    // console.log(state);
    const postChannel = async (e) => {
        e.preventDefault();
        console.log(state);
        console.log('/'+cookies.username+'/'+team_id);
        let response = await axios.post(
                '/'+cookies.username+'/'+team_id,
                {
                    type_: state.type_,
                    title: state.title
                }
            ).catch(err => console.log(err));
        window.alert(response.data);
        setPopup(false);
    }
    return (
        <div className={popup? 'popup__channel' : 'popup__channel__neg'}>
            <div className='popup__channel__pin'>
                <div><h1>Create A Channel</h1></div>
                <div className='popup__channel__pin__close'>
                    <button onClick={() => {setPopup(false)}}>
                        <GiCrossedBones size='2.5em' color='white'/>
                    </button></div>
                <div></div>
                <form onSubmit={e => postChannel(e)}>
                    <label>Choose Channel Type</label>
                    <div>
                        <div className='popup__channel__pin__type'>
                            <div className='popup__channel__pin__type__radio'>
                                <input value={true} type='radio' name='channel' 
                                    checked={state.type_ === true}
                                    onChange={() => setState(prevState => ({...prevState, type_: true}))}
                                />
                            </div>
                            <div className='popup__channel__pin__type__info'>
                                <b>Text Channel</b>
                                <div><span>Texts, Gifs, Photos,...</span></div>
                            </div>
                        </div>
                        <div className='popup__channel__pin__type'>
                            <div className='popup__channel__pin__type__radio'>
                                <input value={false} type='radio' name='channel'
                                checked={state.type_ === false}
                                onChange={() => setState(prevState => ({...prevState, type_: false}))}
                            />
                            </div>
                            <div className='popup__channel__pin__type__info'>
                                <b>Voice Channel</b>
                                <div><span>Voice, Videos, Share Screen,...</span></div>
                            </div>
                        </div>
                    </div>
                    <label id='channelName'>Channel Name</label>
                    <div className='popup__channel__pin__name'>
                        <input placeholder='Enter Channel Name' 
                            value={state.title} 
                            onChange={(e) => setState(prevState => ({...prevState, title: e.target.value}))}
                        />
                    </div>
                    <div id='submitt'>
                        <button id='submit'><b>Create New Channel</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChannelCreate;