import * as firebase from 'firebase';


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAFq2HV7gmS58KQp5fcBuQcAbl3prVwikM",
  authDomain: "crud-react-5e1db.firebaseapp.com",
  databaseURL: "https://crud-react-5e1db.firebaseio.com",
  projectId: "crud-react-5e1db",
  storageBucket: "crud-react-5e1db.appspot.com",
  messagingSenderId: "29883475764",
  appId: "1:29883475764:web:08785fffd601addba2e761"
};
// Initialize Firebase
var FireDb = firebase.initializeApp(firebaseConfig);

export default FireDb.database().ref();

