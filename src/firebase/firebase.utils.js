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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });

    return await batch.commit();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
