import React, { useState, useEffect } from 'react'
import './scss/Sidebar.scss'
import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db, { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import signIn from './actions/signingIn';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const user = useSelector(state => state.user)
    const [showChats, setShowChats] = useState(false);
    const dispatcher = useDispatch();


    const StyledBadge = withStyles((theme) => ({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))(Badge);

    const SigningOut = () => {
        auth.signOut().then(function () {
            dispatcher(signIn(null))

        }).catch(error => alert(error.message))

    }

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
                {user.photoURL ? (<div className="sideabar__headerUserName"><StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar src={user.photoURL} />
                </StyledBadge><p>{user.displayName}</p></div>) : (<div className="sideabar__headerUserName"> <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar />
                </StyledBadge> <p>{user.displayName}</p></div>)}


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

                <div className="sidebar__rightsideMobile">
                    <IconButton id="chat__logoutbutton" onClick={SigningOut}>
                        <PowerSettingsNewIcon />
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


            <div className="sidebar__ChatsSelect" >
                <Button onClick={() => setShowChats(!showChats)}>Select Chat</Button>
                {showChats && <div className="sidebar__Chats__Mobile">
                    <SidebarChat addChat />
                    {rooms.map(room =>
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />)}
                </div>}
            </div>



        </div>
    )
}

export default Sidebar
