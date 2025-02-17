import { useState } from 'react'
import { auth, db } from '../firebase.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore'
import './App.css'

function App() {

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }


  const handleSignup = async () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCred) => {
        console.log(userCred);

      })
      .catch((error) => {
        console.log('Error during login');

      })
  }

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error?.message);
      })
  }

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        console.log('Credential', credential);
        console.log('User', response.user);
      })
      .catch((error) => {
        console.log('error during google signin');

      })
  }

  const setDBData = async () => {

    const citiesRef = collection(db, 'cities');

    await setDoc(doc(citiesRef, 'SF'), {
      name: 'San Francisco',
      country: 'USA',
      population: 860000
    })

    await setDoc(doc(citiesRef, 'DC'), {
      name: 'Washington D.C',
      country: 'USA',
      population: 3900000
    })

    await setDoc(doc(citiesRef, 'Pu'), {
      name: 'Pune',
      country: 'India',
      population: 4569000
    })
    console.log('Db Data has been set');
  }

  const getDBData = async () => {

    const docRef = doc(db, 'cities', 'SF');
    const collectionRef = collection(db, 'cities');
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  return (
    <>
      <h1>Firebase 🔥🔥🔥</h1>
      <input
        type="email"
        placeholder='email'
        name='email'
        value={data.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name='password'
        placeholder='password'
        value={data.password}
        onChange={handleChange}
      />
      <div className="card">
        <button onClick={handleLogin}>
          Login
        </button>
        <br />
        <p>or</p>
        <button onClick={handleGoogleSignIn}>
          Login with Google
        </button>
        <br />
        <button onClick={setDBData} disabled>
          Set Data
        </button>
        <button onClick={getDBData}>
          Get Data
        </button>
      </div>
    </>
  )
}

export default App
