import { createApp } from 'vue'
import VueDraggable from 'vue-draggable';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/firestore"
import App from './App.vue'
import "@/assets/team.css"

const config = {
  apiKey: "AIzaSyCr7urJbPvB5ia3-YboqI-oDxu42VRCvdk",
  authDomain: "todolist-b48a7.firebaseapp.com",
  databaseURL: "https://todolist-b48a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-b48a7",
  storageBucket: "todolist-b48a7.appspot.com",
  messagingSenderId: "492361380134",
  appId: "1:492361380134:web:bca47656fcf61d5bc911e7",
  measurementId: "G-ECE4SE2ECB"
};
firebase.initializeApp(config);




export const db = firebase.firestore();
export const test = firebase.firestore().collection("todos").doc("todo").get()

console.log("TestlOGO",test)


db.collection('todos').get().then(r =>{
  r.docs.map(doc => {
    console.log(doc.data(''));
  });
});















const app = createApp(App);

app.use(VueDraggable)
app.mount('#app');