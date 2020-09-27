import React, { useState, useEffect } from 'react';
import './scss/SidebarChat.scss';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import db from './firebase'
import PhotoIcon from '@material-ui/icons/Photo';
import DescriptionIcon from '@material-ui/icons/Description';


function SidebarChat({ addChat, id, name }) {

    const [seed, Setseed] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
                (setMessages(snapshot.docs.map(doc =>
                    doc.data()))
                ));
        }

    }, [id]) //need to check why is id when change a dependency


    useEffect(() => {
        Setseed(Math.floor(Math.random() * 5000))
    }, [])

    const addNewChat = () => {
        const newRoom = prompt("Enter name for new Chat");
        if (newRoom) {
            db.collection('rooms').add({
                name: newRoom,
            })
        }

    };

    return !addChat ? (

        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__messages">
                    <p className="sidebar__chatname">{name}</p>
                    {messages[0]?.message ? <p>{messages[0]?.message}</p> : <div className="sidebarChat__lastPhoto">{messages[0]?.image ? (<div className="sidebarChat__fileInfo"><PhotoIcon /> Photo </div>) : (<div className="sidebarChat__fileInfo"><DescriptionIcon /> FILE </div>)}</div>}
                </div>

            </div>
        </Link>
    ) : (
            <div onClick={addNewChat} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )


}

export default SidebarChat
