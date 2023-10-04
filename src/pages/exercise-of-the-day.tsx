import React, { FC } from "react";
import AuthProvider from "../components/AuthContext";
import ExcerciseOfTheDay from "../components/ExerciseOfTheDay";

const ExcerciseOfTheDayPage: FC = () => {
  return (
    <AuthProvider>
      <ExcerciseOfTheDay />
    </AuthProvider>
  );
};

export default ExcerciseOfTheDayPage;
