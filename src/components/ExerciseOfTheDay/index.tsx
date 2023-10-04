import React, { FC } from "react";
import { useAuth } from "../AuthContext";
import Login from "./Login/Login";
import Playground from "./Playground/Playground";

const ExcersiseOfTheDay: FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  if (!currentUser) {
    return <Login />;
  }

  return <Playground />;
};

export default ExcersiseOfTheDay;
