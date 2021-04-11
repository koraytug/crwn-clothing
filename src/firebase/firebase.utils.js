import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBf4AdTwONEPANwk6huczBOvD6I2AtWa3g',
  authDomain: 'crwn-db-bbe73.firebaseapp.com',
  projectId: 'crwn-db-bbe73',
  storageBucket: 'crwn-db-bbe73.appspot.com',
  messagingSenderId: '768627884424',
  appId: '1:768627884424:web:a3658e38308c6f80a57a3d',
  measurementId: 'G-R39KK0WW6J',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
