import 'firebase/analytics';

import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyD9JCLfzQORcwaKlAFuqaOLn46A6Ld-0P8",
  authDomain: "yo-soy-bacan-cb1c2.firebaseapp.com",
  databaseURL: "https://yo-soy-bacan-cb1c2.firebaseio.com",
  projectId: "yo-soy-bacan-cb1c2",
  storageBucket: "yo-soy-bacan-cb1c2.appspot.com",
  messagingSenderId: "320481320513",
  appId: "1:320481320513:web:f71796221c8d886ab730c0",
  measurementId: "G-69M2480X1F"
};

const firebaseClient = firebase.initializeApp(firebaseConfig);
export default firebaseClient;