import { onAuthStateChanged } from "firebase/auth";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import React, { FC, createContext, useContext, useEffect, useState } from "react";
import Firestore from "../utils/Firestore";
import { auth, db } from "../utils/firebase";
import { AuthContext as IAuthContext, User } from "./ExerciseOfTheDay/types";

const defaultContext: IAuthContext = {
  currentUser: null,
  loading: true,
  setCurrentUser: null as any,
};

export const AuthContext = createContext(defaultContext);
export const useAuth = (): IAuthContext => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    let unsub: Unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const currentUserInDb = await Firestore.getCurrentUser(user);
          setCurrentUser(currentUserInDb);

          unsub = onSnapshot(doc(db, "users", user.email!), (doc) => {
            setCurrentUser({
              ...user,
              practiceHistory: doc.data()?.practiceHistory,
            });
          });

          return;
        } catch (error) {
          alert((error as Error).message);
        } finally {
          setLoading(false);
        }
      }

      if (typeof unsub === "function") unsub();
      setLoading(false);
      return setCurrentUser(null);
    });

    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ currentUser, loading, setCurrentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
