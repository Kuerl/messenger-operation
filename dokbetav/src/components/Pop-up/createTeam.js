import React, {useState} from 'react';
import '../../css/Pop-up/createteam.css';
import { useCookies } from "react-cookie";

import { axios } from '../../util/axios';
import socket from '../../util/socket';

import { GiCrossedBones } from "react-icons/gi";
import {HiArrowCircleRight} from 'react-icons/hi';

const TeamCreate = ({popup, setPopup, setButton}) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [state, setState] = useState({title: '', members: ['']});

    const handleCreate = async (e) => {
        e.preventDefault();
        if (state.title === '' || state.members[0] === '') {
            window.alert('Please fill all of information');
        }
        else {
            try {
                let response = await axios.post('/'+cookies.username, {title: state.title, members: state.members.split(';')})
                                        .catch(err => console.log(err));
                window.alert(response.data);
                setPopup(false);
            } catch (error) {
                window.alert(error);
            }
        }
    }

    return (
        <div className={popup ? 'createteam__popup' : 'createteam__popup__neg'} >
            <div className='createteam__popup__pin'>
                <div className='createteam__popup__pin__close'>
                    <button onClick={() => {setPopup(false); setButton(-1)}}>
                        <GiCrossedBones size='2.5em' color='white'/>
                    </button></div>
                <div>
                    <form onSubmit={handleCreate}>
                        <table>
                            <tr>
                                <th><label>Team's title: </label></th>
                                <th><input value={state.title}
                                        onChange={e => setState(prevState => ({...prevState, title: e.target.value}))}
                                /></th>
                            </tr>
                            <tr>
                                <th><label>Members: </label></th>
                                <th><input value={state.members}
                                        onChange={e => setState(prevState => ({...prevState, members: e.target.value}))}
                                /></th>
                            </tr>
                            <tr><button><HiArrowCircleRight size='2.5em' color='white'/></button></tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TeamCreate;
