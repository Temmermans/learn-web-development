import React, { FC } from "react";
import Firestore from "../../../../utils/Firestore";
import { useAuth } from "../../../AuthContext";
import { ExerciseOfTheDay } from "../../types";

const History: FC<{ setExercise: (exercise: ExerciseOfTheDay) => void }> = ({ setExercise }) => {
  const { currentUser } = useAuth();

  return (
    <div className="History">
      <h3>History</h3>
      {currentUser?.practiceHistory.map((e) => (
        <div
          onClick={() => {
            Firestore.getExercise(e.name).then((exercise) => {
              setExercise(exercise);
            });
          }}
          style={{ cursor: "pointer" }}
          key={e.name}
        >
          {e.name}
          <span>{e.complete.toString()}</span>
        </div>
      ))}
    </div>
  );
};

export default History;
