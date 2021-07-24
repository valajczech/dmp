// Imports
import "../css/index.css";
import firebase from "firebase";
import { Users } from "../js/core";

// Variables

// DOM Variables
const submitBtn = document.querySelector("#submitBtn");
const userInput = document.querySelector("#userInput");
const passwdInput = document.querySelector("#passwdInput");

submitBtn.onclick = async () => {
  await Users.login(userInput.value, passwdInput.value);
};

document.onkeydown = (key) => {
  if(key.code == "Enter") {
    submitBtn.click();
  }
}