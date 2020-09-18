import React from 'react'
import { useDispatch } from 'react-redux'
import './Login.css';
import { auth, provider } from './firebase';
import signIn from './actions/signingIn'
import { Button } from '@material-ui/core';


function Login() {
    const dispatcher = useDispatch();



    const signInwGoogle = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatcher(signIn(result.user))
        }).catch(error => alert(error.message));
    }


    const loginAsGuesst = () => {


        dispatcher(signIn({ displayName: "Guest" }))

    }

    return (

        <div className="loginIn">
            <div className="loginIn__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" alt=""></img>
                <h1 className="loginIn__text">Sign In to WhatsApp</h1>
                <div className="loginIn__buuttons">
                    <Button onClick={signInwGoogle}>Sing In with Google</Button>
                    <Button onClick={loginAsGuesst}>Login with Guest Account</Button>
                </div>

            </div>
        </div>


    )

}




export default Login
