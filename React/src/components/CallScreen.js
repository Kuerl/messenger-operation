import React from 'react';
import GroupBar from './GroupBar.js';
import Logo from '../img/favicon.ico';
import Test from '../img/frame.png'
import '../stylesheets/callwin.css';
import '../stylesheets/chatting.css';
import '../stylesheets/groupBar.css';
import '../stylesheets/groupContent.css';
import '../stylesheets/callscreen.css';

import {Link} from 'react-router-dom';
import {FaPlus, FaGlobeAsia, FaHashtag, FaVolumeUp, FaRegCalendarCheck} from 'react-icons/fa';
import {FaPhoneSlash, FaVolumeMute, FaMicrophone,FaPhone} from 'react-icons/fa';


const hangup__style ={
	color: 'white',
	fontSize: '40px', 
	margin: "14px 0px 0px 0px",
}
    var h = 0; // Giờ
    var m = 0; // Phút
    var s = 0; // Giây
	var timeout; // Timeout
function Time(){
	
	if (s === 60){
		m++;
		s = 0;}
	if (m === 60){
		h++;
		m = 0;}
	if (h === 60){
		clearTimeout(timeout);
		alert('Time Out');
		return false;}

    document.getElementById('h').innerText = h.toString();
    document.getElementById('m').innerText = m.toString();
    document.getElementById('s').innerText = s.toString();

	timeout = setTimeout(function(){
		s++;
		Time();
	},1000);

}
 function stop(){
                clearTimeout(timeout);
            }
const CallScreen = () => {
	return(
	
		<div className='__callscreen'>
			<div className='__callscreen__avatar__container'>
				<div className='__callscreen__avatar'>
					<img src={Logo} alt='Logo'/>
					<img src={Logo} alt='Logo'/>
				</div>
				<div className='__callscreen__function'>
					<button id='connect' title='Connect' onClick={Time}><FaPhone style={{color: 'white', fontSize: '40px'}}/></button>
				</div>
				<div className='__callscreen__timer'>
					<span id="h">00</span> :
					<span id="m">00</span> :
					<span id="s">00</span> 
				</div>
			</div>
			
			<div className='__callscreen__function'>
				<button title='Speaker'> <FaVolumeUp style={{color: 'white', fontSize: '40px'}}/> </button>
				<button title='Mute'> <FaMicrophone style={{color: 'white', fontSize: '40px'}}/> </button>
				<button id='hangup' title='Hang Up' onClick={stop}><Link id='link' to='/c'><FaPhoneSlash style={hangup__style}/></Link></button>

 

 
			</div>
		</div>
	)
}
export default CallScreen;