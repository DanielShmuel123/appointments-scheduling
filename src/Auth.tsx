import React, { useState } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import EventCreationForm from "./Components/EventCreation";

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (error) {
    console.error(error);
  }
};

const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Sign In or Sign Up</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signUpWithEmailAndPassword(email, password)}>Sign Up</button>
      <button onClick={() => signInWithEmail(email, password)}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default Auth;
