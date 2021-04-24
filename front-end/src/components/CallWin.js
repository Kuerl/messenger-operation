import React from 'react';
import GroupBar from './GroupBar.js';
import CallScreen from './CallScreen.js';
import Logo from '../img/favicon.ico';
import Test from '../img/frame.png'
import '../stylesheets/callwin.css';
import '../stylesheets/chatting.css';
import '../stylesheets/groupBar.css';
import '../stylesheets/groupContent.css';
import '../stylesheets/callscreen.css';
import {FaPlus, FaGlobeAsia, FaHashtag, FaVolumeUp, FaRegCalendarCheck} from 'react-icons/fa';



const CallWin = () => {
	return(
		<div className='__callwin'>
			<div className='__chat__groupBar'>
                <GroupBar />
			</div>
			<div className='__callscreen'>
				<CallScreen />
            </div>

		</div>

	);
}
export default CallWin;
	
	