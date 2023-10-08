import { signOut } from "firebase/auth";
import React, { FC } from "react";
import { auth } from "../../../../utils/firebase";
import { useAuth } from "../../../AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header: FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="Header">
      <div className="HeaderLeft">
        <img
          className="logo"
          src={"../../../../../exercise-of-the-day-logo.png"}
        />
        <h2>Excerise of the Day</h2>
      </div>
      <div className="HeaderRight">
        <DarkModeToggle />
        {currentUser?.photoURL && (
          <img className="profile-picture" src={currentUser?.photoURL} />
        )}
        <section>
          <b className="username">{currentUser?.displayName}</b>
          <p className="username small">
            Exercises done: {currentUser?.practiceHistory?.length}
          </p>
        </section>
        <button className="signout" onClick={async () => await signOut(auth)}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
