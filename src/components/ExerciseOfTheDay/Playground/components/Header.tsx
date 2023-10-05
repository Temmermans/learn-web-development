import { signOut } from "firebase/auth";
import React, { FC } from "react";
import { auth } from "../../../../utils/firebase";
import { useAuth } from "../../../AuthContext";

const Header: FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="Header">
      {currentUser?.photoURL && <img className="profile-picture" src={currentUser?.photoURL} />}
      <section>
        <p className="email">{currentUser?.displayName}</p>
        <p className="email">Exercises done: {currentUser?.practiceHistory?.length}</p>
      </section>
      <button className="signout" onClick={async () => await signOut(auth)}>
        Log out
      </button>
    </div>
  );
};

export default Header;
