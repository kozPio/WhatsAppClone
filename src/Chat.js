import React, { useState, useEffect } from 'react';
import './scss/Chat.scss';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFile from '@material-ui/icons/AttachFile';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db, { auth } from './firebase';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import SimplePopper from './Overpop';
import UploadFile from './UploadFile';
import EmojiArray from './EmojiArray';
import setInput from './actions/settingInput';
import setUpload from './actions/settingUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import signIn from './actions/signingIn';




function Chat() {

    const [seed, Setseed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.user)
    const input = useSelector(state => state.input)
    const dispatcher = useDispatch();
    const showUpload = useSelector(state => state.uploadWindow);


    const [emojis, setEmojis] = useState(["😀", "😁", "😅", "🤣", "😂", "🙂", "😉", "😷", "😊", "😇", "😍", "😘", "😛", "😜", "🤑", "🤭", "🤫", "🤔", "😏", "🙄", "🧐", "😎", "😲", "🥳", "😳"])


    const SigningOut = () => {
        auth.signOut().then(function () {
            dispatcher(signIn(null))

        }).catch(error => alert(error.message))

    }



    const SendMessage = (e) => {
        e.preventDefault();
        console.log()
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }
        );
        dispatcher(setInput(""))

    }


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))));

            db.collection('rooms').doc(roomId).collection('messages').onSnapshot(() => document.querySelector(".chat__message:last-child").focus())

        }



    }, [roomId]);



    useEffect(() => {
        Setseed(Math.floor(Math.random() * 5000))
    }, [])
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at: {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerright">
                    <IconButton onClick={() => dispatcher(setUpload(true))}>
                        <AttachFile />
                    </IconButton>
                    <IconButton id="chat__logoutbutton" onClick={SigningOut}>
                        Logout <PowerSettingsNewIcon />
                    </IconButton>


                </div>
                {showUpload && <UploadFile />}


            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <div tabIndex="0" key={new Date(message.timestamp?.toDate()).toUTCString()} className={`chat__message ${user.displayName === message.name && "chat__reciver"}`}>
                        <span className="chat__name">{message.name}</span>{message.message || <img className="chat__messageImage" src={message.image} alt=""></img>}{message.file && <div className="chat__file"><DescriptionIcon /><a className="chat__fileName" href={message.file} target="_blank">{message.fileName}</a></div>}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></div>))

                }






            </div>

            <div className="chat__footer">

                <SimplePopper poperContent={<EmojiArray emojis={emojis} />} buttonImage={<EmojiEmotions />} />

                <form>
                    <input placeholder="Type your message" value={input} onChange={(e) => dispatcher(setInput(e.target.value))} type="text"></input>
                    <button onClick={SendMessage} type="submit">Submit</button>
                </form>
                <div className="chat__footer__micIcon">
                    <IconButton  >

                        <MicIcon />
                    </IconButton>
                </div>

                <div className="chat__footer__attachFile">
                    <IconButton onClick={() => dispatcher(setUpload(true))}>
                        <AttachFile />
                    </IconButton>
                </div>
            </div>

        </div>
    )
}

export default Chat




