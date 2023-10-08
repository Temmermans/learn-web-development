import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { FC } from "react";
import { auth } from "../../../utils/firebase";
import "./styles.css";

const Login: FC = () => {
  return (
    <section className="signin-form">
      <h2>Please sign in to continue</h2>
      <button
        onClick={async () => {
          const provider = new GoogleAuthProvider();
          try {
            await signInWithPopup(auth, provider);
          } catch (err) {
            if ((err as Error).message.includes("account-exists-with-different-credential")) {
              alert("You already have an account with this email address. Please sign in with Github.");
            }
          }
        }}
      >
        <img src="/google.png" />
        Google
      </button>
      <button
        onClick={async () => {
          const provider = new GithubAuthProvider();
          try {
            await signInWithPopup(auth, provider);
          } catch (err) {
            if ((err as Error).message.includes("account-exists-with-different-credential")) {
              alert("You already have an account with this email address. Please sign in with Google.");
            }
          }
        }}
      >
        <img src="/github.png" />
        Github
      </button>
    </section>
  );
};

export default Login;
