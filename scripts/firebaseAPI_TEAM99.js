//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCfVPrPqB8zfwoMkVJm6mhZfyG2oK_TMXg",
    authDomain: "fir-comp1800-41ff4.firebaseapp.com",
    projectId: "fir-comp1800-41ff4",
    storageBucket: "fir-comp1800-41ff4.appspot.com",
    messagingSenderId: "168618548656",
    appId: "1:168618548656:web:f995d84a11e8e78d9e8a75"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();