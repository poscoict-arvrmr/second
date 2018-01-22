import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDKEYRybMQOAkpMZp2F3bTvQFboa2VJgrI",
  authDomain: "test-webrtc-56501.firebaseapp.com",
  databaseURL: "https://test-webrtc-56501.firebaseio.com",
  projectId: "test-webrtc-56501",
  storageBucket: "test-webrtc-56501.appspot.com",
  messagingSenderId: "1044697177062"
};
firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
export {firebase, auth as default};
