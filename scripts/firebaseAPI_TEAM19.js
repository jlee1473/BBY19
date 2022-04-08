//  Our web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB8Hw0qvaDZ5uS6VvRWptUvzZyCpPA_ZKw",
    authDomain: "comp1800-team19-reportify.firebaseapp.com",
    projectId: "comp1800-team19-reportify",
    storageBucket: "comp1800-team19-reportify.appspot.com",
    messagingSenderId: "203831932783",
    appId: "1:203831932783:web:958b9d68d41a8fe0595a9a"
};

// initialize the Firebase app
// initialize Firestore database if using it
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();