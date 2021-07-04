// Imports
import "../css/index.css";
var firebase = require("firebase");
var ui = require("firebaseui");

// Variables

// Code:

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  // Other config options...
});
