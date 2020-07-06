import firebase from 'firebase'
import { firebaseConfig } from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();


