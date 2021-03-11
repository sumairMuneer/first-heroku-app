
import firebase from 'firebase';

import 'firebase/storage'

const config={
    apiKey: "AIzaSyBPEGzuZkSlZm4bws7Mc5sHxpRePW34rPs",
    authDomain: "matwagroup.firebaseapp.com",
    databaseURL: "https://matwagroup.firebaseio.com",
    projectId: "matwagroup",
    storageBucket: "matwagroup.appspot.com",
    messagingSenderId: "1075176820321",
    appId: "1:1075176820321:web:bf9795e57516b56980e420",
    measurementId: "G-JY5R79F5RQ"
};
firebase.initializeApp(config);

firebase.analytics();

const storage= firebase.storage()

export  {firebase, storage}
