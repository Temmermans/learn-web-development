import React, { FC, useState } from "react";
import Firestore from "../../../../utils/Firestore";
import { useAuth } from "../../../AuthContext";
import { ExerciseOfTheDay } from "../../types";
import Card from "./Card";

const History: FC<{
  setExercise: (exercise: ExerciseOfTheDay) => void;
}> = ({ setExercise }) => {
  const { currentUser } = useAuth();
  const [selectedCard, setselectedCard] = useState<number | null>(null);

  return (
    <div className="History">
      <div style={{ marginBottom: 15 }}>
        <b>History</b>
      </div>
      {currentUser?.practiceHistory.map((e, i) => (
        <Card
          selected={i === selectedCard}
          onClick={() => {
            setselectedCard(i);
            Firestore.getExercise(e.name).then((exercise) => {
              setExercise(exercise);
            });
          }}
          key={e.name}
        >
          <Card.Title>{e.name}</Card.Title>
          <div style={{ textAlign: "right" }}>
            <Card.StatusTag status={e.complete ? "COMPLETED" : "INPROGRESS"} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default History;
