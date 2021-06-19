import '../css/call.css';

import React, { Component } from 'react';

class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    constructor({roomID, userName}) {
        super();
        this.state = {
            room: roomID,
            user: {
                name: userName
            },
            isAudioMuted: false,
            isVideoMuted: false
        }
    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: 500,
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);
        console.log(this.state.roomID);
    }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        return (
            <>
            <div id="jitsi-iframe"></div>
            </>
        );
    }
}

export default JitsiComponent;
