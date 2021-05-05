import React from 'react';
import '../stylesheets/msgViewOperation.css';
import '../stylesheets/messageView.css';

export const DetailBar = () => {
    return(
        <div className='__chat__detail'>
            DetailBar
        </div>
    );
}

export const MessageView = () => {
    return(
        <div className='__chat__msg'>

        </div>
    );
}

export const ContentView = () => {
    return(
        <div className='__chat__content'>
            <MessageView />
        </div>
    );
}

export const ContentBar = () => {
    return(
        <div className='__chat__bar'>
            Chat Bar
        </div>
    );
}