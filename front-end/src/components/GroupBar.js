import React from 'react';
import Logo from '../img/favicon.ico';
import Test from '../img/frame.png'
import '../stylesheets/global.css';
import '../stylesheets/chatting.css';
import '../stylesheets/groupBar.css';
import '../stylesheets/groupContent.css';
import {FaPlus, FaGlobeAsia, FaHashtag, FaVolumeUp, FaRegCalendarCheck} from 'react-icons/fa';

const ChannelContent = () => {
    return(
        <div className='__channel__contentView'>
            <div className='__channel__contentView__'>
                <button><FaHashtag /><span>General</span></button>
                <div className='__channel__contentView__status'><span>A Task Is Running...</span></div>
            </div>
            <div className='__channel__contentView__'>
            <button>
                <FaHashtag /><span>Work-flow</span></button>
                <div className='__channel__contentView__status'><span>A Task Is Running...</span></div>
            </div>
            <div className='__channel__contentView__'>
                <button><FaVolumeUp /><span>Voice</span></button>
                <div className='__channel__contentView__status'><div><img src={Test} alt='Kuerl'/></div><span>Kuerl</span></div>
                <div className='__channel__contentView__status'><div><img src={Test} alt='Kuerl'/></div><span>Username - 1</span></div>
                <div className='__channel__contentView__status'><div><img src={Test} alt='Kuerl'/></div><span>Username - 2</span></div>
                <div className='__channel__contentView__status'><div><img src={Test} alt='Kuerl'/></div><span>Username -3</span></div>
            </div>
            <div className='__channel__contentView__'>
                <button className='__channel__contentView__Mark'><FaRegCalendarCheck /><span>Mark</span></button>
                <div className='__channel__contentView__Mark__content'>
                    <label>Username: </label><span>Here is Marks - 1</span><br />
                    <label>Username: </label><span>Here is Marks - 2</span><br />
                    <label>Username: </label><span>Here is Marks - 3</span><br />
                    <label>Username: </label><span>Here is Marks - 4</span><br />
                    <label>Username: </label><span>Here is Marks - 5</span><br />
                    <label>Username: </label><span>Here is Marks - 6</span><br />
                </div>
            </div>
            
        </div>
    );
}

const ChannelBar = () => {
    return(
        <div className='__channel'>
            <div className='__channel__header'>
                <button type='button'><span id='Setting'>Channel Name</span></button>
            </div>
            <div className='__channel__content'>
                <ChannelContent />
            </div>
        </div>
    );
}

const GroupBar = () => {
    return(
        <div className='__chat__groupBar__content'>
            <div className='__chat__groupView'>
                <button>
                    <img src={Logo} alt='Logo'/>
                </button>
                <hr />
                <button>
                    <span>D</span>
                </button>
                <button>
                    <span>Op</span>
                </button>
                <hr />
                <button id='createGroup'>
                    <FaPlus style={{color: 'white', fontSize: '30px'}}/>
                </button>
                <button id='createGroup'>
                    <FaGlobeAsia style={{color: 'white', fontSize: '30px'}}/>
                </button>
            </div>
            <div className='__chat__groupChannel'>
                <ChannelBar />
            </div>
        </div>
    );
}

export default GroupBar;