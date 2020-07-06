import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBajuCFNSZ5yxomYyFBJ7bbbrNdjas7MKk",
  authDomain: "museum-firebase-test.firebaseapp.com",
  databaseURL: "https://museum-firebase-test.firebaseio.com",
  projectId: "museum-firebase-test",
  storageBucket: "museum-firebase-test.appspot.com",
  messagingSenderId: "1044988996058",
  appId: "1:1044988996058:web:4931e277845febbd2078e3",
  measurementId: "G-S64Z7ZXJ9Z"
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb;
