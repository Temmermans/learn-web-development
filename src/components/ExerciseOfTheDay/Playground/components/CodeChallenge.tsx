import { SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { cobalt2 } from "@codesandbox/sandpack-themes";
import React, { FC } from "react";
import Firestore from "../../../../utils/Firestore";
import { useAuth } from "../../../AuthContext";
import DifficultyBadge from "../../DifficultyBadge";
import { ExerciseOfTheDay } from "../../types";
import CodeEditor from "./CodeEditor";

const CodeChallenge: FC<{
  exercise: ExerciseOfTheDay;
  setExercise: (exercise: ExerciseOfTheDay) => void;
}> = ({ exercise, setExercise }) => {
  const { currentUser } = useAuth();
  const userExerciseHistory = currentUser?.practiceHistory.find(
    (e) => e.name === exercise?.["Exercise Name"]
  );

  if (!exercise) return null;

  return (
    <>
      <div className="Explanation">
        <section>
          <h3>
            {exercise?.["Exercise Name"]}{" "}
            <DifficultyBadge>
              {exercise["Difficulty Score (1-10)"]}
            </DifficultyBadge>
          </h3>
          <p>{exercise?.["Description"]}</p>
          <span>Expected Output: {exercise?.["Expected Output"]}</span>
        </section>
        <section className="controls">
          <span>
            Status:{" "}
            {userExerciseHistory?.complete ? "Complete" : "Not Completed"}
          </span>
          <button
            onClick={() => {
              const time = new Date().getTime();
              Firestore.getExerciseOfTheDay(time).then((exerciseOfTheDay) => {
                setExercise(exerciseOfTheDay);
              });
            }}
          >
            Random Exercise
          </button>
        </section>
      </div>
      <div className="Code-Area">
        <SandpackProvider
          //   customSetup={{
          //     dependencies: {},
          //   }}
          //   options={{
          //     externalResources: [],
          //   }}
          files={{
            "exercise.js": {
              code:
                userExerciseHistory?.codeWritten || exercise["Initial Code"],
              active: true,
            },
            "solution.js": {
              code: exercise["Solution Code"],
            },
            "exercise.test.js": {
              code: exercise["Jest Test Code"],
            },
          }}
          theme={cobalt2}
        >
          <SandpackLayout>
            <CodeEditor exercise={exercise} />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </>
  );
};

export default CodeChallenge;
