import React, { FC, useEffect, useState } from "react";
import Firestore from "../../../utils/Firestore";
import { ExerciseOfTheDay } from "../types";
import CodeChallenge from "./components/CodeChallenge";
import Header from "./components/Header";
import History from "./components/History";
import ThemeProvider from "./components/ThemeProvider";
import "./styles.css";

const Playground: FC = () => {
  const [exercise, setExercise] = useState<ExerciseOfTheDay | null>(null);

  useEffect(() => {
    Firestore.getExerciseOfTheDay().then((exerciseOfTheDay) => {
      setExercise(exerciseOfTheDay);
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="container">
        <Header />
        <History setExercise={setExercise} />
        <CodeChallenge
          exercise={exercise as ExerciseOfTheDay}
          setExercise={setExercise}
        />
      </div>
    </ThemeProvider>
  );
};

export default Playground;
