// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKzzXskDfdnfmG1yghnHOjFZmg5qGATwo",
  authDomain: "netflix-clone-2ec4a.firebaseapp.com",
  projectId: "netflix-clone-2ec4a",
  storageBucket: "netflix-clone-2ec4a.appspot.com",
  messagingSenderId: "32985378529",
  appId: "1:32985378529:web:11023a58f5a656fe8951a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user
    // add 1 object với những thuộc tính như phía
    // dưới vào collection user
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
    })
    toast.success("Đăng kí thành công")
  } catch (error) {
    console.log(error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Đăng nhập thành công")
    }
    catch (error) {
        console.log(error.message)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}