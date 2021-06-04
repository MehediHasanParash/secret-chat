import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }


    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "PROJECT-ID": "e0dfb811-e4a4-48a8-b668-759d1b1d7034",
                "USER-NAME": user.email,
                "USER-SECRET": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) =>{
                formdata.append('avatar', avatar,  avatar.name);

                axios.post('https://api.chatengine.io/users/', formdata, {
                    headers: { "PRIVATE-KEY": "64ef0b06-dded-449c-b94f-a7f7d81c466e"}
                })
                .then(() => setLoading(false))
                .catch((error) => console.log(error));
            })
        })

    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Secret Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="e0dfb811-e4a4-48a8-b668-759d1b1d7034"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;