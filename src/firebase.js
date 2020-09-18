import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5UcAR7BHuGYKMmHzJ_7sz3NqT7KXQYTo",
    authDomain: "whatsupapp-54a8e.firebaseapp.com",
    databaseURL: "https://whatsupapp-54a8e.firebaseio.com",
    projectId: "whatsupapp-54a8e",
    storageBucket: "whatsupapp-54a8e.appspot.com",
    messagingSenderId: "86451752179",
    appId: "1:86451752179:web:cc07dc2a3b26d2a1ea3b86",
    measurementId: "G-CJPP3LJ9BP"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const dataStorage = firebaseApp.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, dataStorage };
export default db;
