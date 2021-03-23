import React from 'react';
import '../stylesheets/global.css';
import '../stylesheets/chatting.css';
import GroupBar from './GroupBar.js';
import {ContentView, ContentBar, DetailBar} from './MessageView.js';
import '../stylesheets/messageView.css';

const Chatting = () => {
    return(
        <div className='__chat'>
            <div className='__chat__groupBar'>
                <GroupBar />
            </div>
            <div className='__chat__msgView'>
                    <ContentBar />
                <div className='__chat__msgView__content'>
                    <ContentView />
                    {/* <DetailBar /> */}
                </div>
            </div>
        </div>
    );
}

export default Chatting;