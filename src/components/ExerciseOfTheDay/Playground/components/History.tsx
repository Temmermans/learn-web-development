import React, { FC, useEffect, useState } from "react";
import Firestore from "../../../../utils/Firestore";
import { useAuth } from "../../../AuthContext";
import DifficultyBadge from "../../DifficultyBadge";
import { ExerciseOfTheDay } from "../../types";

const History: FC = () => {
  const { currentUser } = useAuth();
  const [userHistory, setUserHistory] = useState<ExerciseOfTheDay[]>([]);

  useEffect(() => {
    Firestore.getUserHistory(currentUser).then((history) => {
      setUserHistory(history);
    });
  }, [currentUser?.practiceHistory]);

  return (
    <div className="History">
      <h3>History</h3>
      {userHistory.map((e) => (
        <div key={e["Exercise Name"]}>
          <DifficultyBadge>{e["Difficulty Score (1-10)"]}</DifficultyBadge>
          {e["Exercise Name"]}
        </div>
      ))}
    </div>
  );
};

export default History;
