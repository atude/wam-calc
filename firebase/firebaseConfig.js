import firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from '../.env.js';

//Init firebase
let getFirebase = firebase.initializeApp(firebaseConfig);

export default getFirebase;

