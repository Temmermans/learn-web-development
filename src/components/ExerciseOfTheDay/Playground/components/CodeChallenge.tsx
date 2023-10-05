import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackProvider,
  SandpackTests,
} from "@codesandbox/sandpack-react";
import { cobalt2 } from "@codesandbox/sandpack-themes";
import React, { FC, useEffect, useState } from "react";
import Firestore from "../../../../utils/Firestore";
import DifficultyBadge from "../../DifficultyBadge";
import { ExerciseOfTheDay } from "../../types";
const CodeChallenge: FC = () => {
  const [exercise, setExercise] = useState<ExerciseOfTheDay | null>(null);

  useEffect(() => {
    Firestore.getExerciseOfTheDay().then((exerciseOfTheDay) => {
      setExercise(exerciseOfTheDay);
    });
  }, []);

  if (!exercise) return null;

  return (
    <>
      <div className="Explanation">
        <section>
          <h3>
            {exercise?.["Exercise Name"]} <DifficultyBadge>{exercise["Difficulty Score (1-10)"]}</DifficultyBadge>
          </h3>
          <p>{exercise?.["Description"]}</p>
          <span>Expected Output: {exercise?.["Expected Output"]}</span>
        </section>
        <section className="controls">
          <button>Mark as complete</button>
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
              code: exercise["Initial Code"],
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
            <SandpackCodeEditor
              extensions={[autocompletion()]}
              extensionsKeymap={[completionKeymap] as any}
              showLineNumbers
              closableTabs
              showTabs
            />
            <SandpackConsole showSyntaxError standalone />
            <SandpackTests />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </>
  );
};

export default CodeChallenge;
