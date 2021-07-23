import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDuLf13Q-NW9UMwKDF5EmSEZX5zSB_WUr0',
  authDomain: 'signal-clone-b10c4.firebaseapp.com',
  projectId: 'signal-clone-b10c4',
  storageBucket: 'signal-clone-b10c4.appspot.com',
  messagingSenderId: '792302682457',
  appId: '1:792302682457:web:3b45dac52378bd52570c48',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = firebase.auth();
