import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB_h0k-5vMMthV3DrPlUPlRfLv38mFb7pA",
    authDomain: "cooking-gallery-8d52f.firebaseapp.com",
    projectId: "cooking-gallery-8d52f",
    storageBucket: "cooking-gallery-8d52f.appspot.com",
    messagingSenderId: "581200298476",
    appId: "1:581200298476:web:07616a9cccdaf38e5cc0c9",
    measurementId: "G-HLDST1SG9Z"
};

firebase.initializeApp(config);
firebase.analytics();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const storage = firebase.storage();

export { googleProvider, auth, storage }
export default firebase;