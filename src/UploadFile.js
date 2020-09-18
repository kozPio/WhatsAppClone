import React from 'react';
import { useState, useEffect } from 'react';
import './UploadFile.css';
import firebase from 'firebase';
import db, { dataStorage } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import setUpload from './actions/settingUpload';
import SendIcon from '@material-ui/icons/Send';


function UploadFile() {


    const [fileValue, setFileValue] = useState();
    const user = useSelector(state => state.user);
    const { roomId } = useParams();
    const dispatcher = useDispatch();
    const [clicked, setClicked] = useState(false);



    useEffect(() => {
        if (clicked) {

            async function showFile() {

                await dataStorage.ref(`files__storage/${fileValue.name}`).put(fileValue);
                dataStorage.ref(`files__storage/${fileValue.name}`).getDownloadURL().then((url) => {
                    if (fileValue.type === "image/png" || fileValue.type === "image/jpeg" || fileValue.type === "image/gif") {
                        db.collection('rooms').doc(roomId).collection("messages").add({
                            name: user.displayName,
                            image: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                    } else {
                        db.collection('rooms').doc(roomId).collection("messages").add({
                            name: user.displayName,
                            fileName: fileValue.name,
                            file: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                    }


                }).catch((error) => {
                    console.log(error)
                });


            }
            showFile();
            dispatcher(setUpload(false));


        }

    }, [clicked])




    // 

    return (
        <div id="console" className="container">
            <button className="upload__closeWindow" onClick={() => dispatcher(setUpload(false))}>X</button>
            <form method="post" action="#" id="#">

                <div className="form-group files">

                    <input type="file" onChange={(e) => setFileValue(e.target.files[0])}></input>

                </div>

            </form>
            <button className="upload__sendButton" onClick={() => setClicked(!clicked)}>{<SendIcon />}</button>

        </div>
    )
}

export default UploadFile;


//<input id="fileImage" type="file" className="form-control" onChange={(e) => setFileValue(e.target.files[0])} multiple="" ></input>