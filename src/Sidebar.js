import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useSelector } from 'react-redux';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const user = useSelector(state => state.user)

    useEffect(() => {
        const changeId = db.collection('rooms').onSnapshot(snapshot =>
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })
            )));
        return () => {
            changeId();
        }

    }, [])

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                {user.photoURL ? (<div className="sideabar__headerUserName"><Avatar src={user.photoURL} /><p>{user.displayName}</p></div>) : (<div className="sideabar__headerUserName"><Avatar /> <p>{user.displayName}</p></div>)}
                <div className="sidebar__rightside">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>



            </div>
            <div className="sidebar__searchbar">
                <SearchOutlined />
                <input placeholder="Search for a chat."></input>
            </div>
            <div className="sidebar__Chats">
                <SidebarChat addChat />
                {rooms.map(room =>
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />)}
            </div>

        </div>
    )
}

export default Sidebar
