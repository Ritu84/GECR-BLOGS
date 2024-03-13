// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxnuaJoS8i8_NtIWdv6TMXgKNfemcdfUM",
  authDomain: "blog-website-fef90.firebaseapp.com",
  projectId: "blog-website-fef90",
  storageBucket: "blog-website-fef90.appspot.com",
  messagingSenderId: "636874332290",
  appId: "1:636874332290:web:2c26c7b9c6cb4977e3bc9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Provider= new GoogleAuthProvider();

const auth =getAuth();

export const authWithGoogle =async() =>{
     
    let user=null;
    await signInWithPopup(auth,Provider)
        .then((result)=>{
             user=result.user;
         })
         .catch((err)=>{
            console.log(err);
         })

         return user;

}
