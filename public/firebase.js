import firebase from 'firebase/app'
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyAeofZ5pSoZe9WWQBLSC4m13YToMrNxr90",
    authDomain: "greenpay1234.firebaseapp.com",
    projectId: "greenpay1234",
    storageBucket: "greenpay1234.appspot.com",
    messagingSenderId: "56657630489",
    appId: "1:56657630489:web:4f407779f994fb3c332188"
};



if (!firebase.apps.length) {
    const fire = firebase.initializeApp(firebaseConfig);
    
} else {
    firebase.app(); // if already initialized, use that one
}
const storage = firebase.storage()

export { storage, firebase };