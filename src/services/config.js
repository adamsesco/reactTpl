import firebase from 'firebase'



var config = {
    apiKey: "AIzaSyDLLccBRrVg7gmO95AXH7mF3OJl9ttx9ao",
    authDomain: "my-new-test-ba7fd.firebaseapp.com",
    databaseURL: "https://my-new-test-ba7fd.firebaseio.com",
    projectId: "my-new-test-ba7fd",
    storageBucket: "my-new-test-ba7fd.appspot.com",
    messagingSenderId: "835529359676"
  };

const Firebase =  firebase.initializeApp(config); 

export default Firebase;