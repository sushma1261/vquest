import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyCal-y8_dam3cz9303G0kPxqGAKySbu_mI",
    authDomain: "vquest-it12b.firebaseapp.com",
    databaseURL: "https://vquest-it12b.firebaseio.com",
    projectId: "vquest-it12b",
    storageBucket: "vquest-it12b.appspot.com",
    messagingSenderId: "764504576785",
    appId: "1:764504576785:web:c0b1e765d2c21010d372b0",
    measurementId: "G-1WBPGZPPSC"
};
  firebase.initializeApp(firebaseConfig);

export default firebase;