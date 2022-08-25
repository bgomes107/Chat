import {initializeApp, getApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = initializeFirestore(app, {experimentalForceLongPolling: true});

  export {db, auth};
