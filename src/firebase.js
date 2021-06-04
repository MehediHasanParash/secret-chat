import firebase from 'firebase/app';
import "firebase/auth";


export const auth = firebase.initializeApp({
        apiKey: "AIzaSyAxc3e2d3XEOTPKkyfaQ3_91qLsy3YA4Mg",
        authDomain: "secret-chat-29755.firebaseapp.com",
        projectId: "secret-chat-29755",
        storageBucket: "secret-chat-29755.appspot.com",
        messagingSenderId: "692022561360",
        appId: "1:692022561360:web:42f8cc2187b18ad0db5f55"
}).auth();