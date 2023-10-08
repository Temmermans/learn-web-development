/* eslint-disable @typescript-eslint/no-explicit-any */
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
  SandpackCodeEditor,
  SandpackTests,
  useSandpack,
} from "@codesandbox/sandpack-react";
import React, { FC, useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import Firestore from "../../../../utils/Firestore";
import { useAuth } from "../../../AuthContext";
import { ExerciseOfTheDay } from "../../types";

const CodeEditor: FC<{ exercise: ExerciseOfTheDay }> = ({ exercise }) => {
  const { currentUser } = useAuth();
  const [testsPassed, setTestStatus] = React.useState<boolean>(false);
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const code = files["/exercise.js"].code;

  const debouncedCodeUpdate = useDebounce((values: Record<string, unknown>) => {
    Firestore.updateUserHistory(
      currentUser?.email as string,
      exercise["Exercise Name"],
      {
        codeWritten: values.code,
        complete: testsPassed,
      }
    );
  }, 2000);

  useEffect(() => {
    debouncedCodeUpdate({ code, testsPassed });
  }, [code, testsPassed]);

  return (
    <>
      <SandpackCodeEditor
        extensions={[autocompletion()]}
        extensionsKeymap={[completionKeymap] as any}
        showLineNumbers
        showTabs
      />
      {/* <SandpackConsole showSyntaxError standalone /> */}
      <SandpackTests
        onComplete={(testInfo) => {
          const tests = testInfo["/exercise.test.js"].tests;
          const passed = Object.values(tests).every(
            (test) => test.status === "pass"
          );
          setTestStatus(passed);
        }}
        showVerboseButton={false}
        showWatchButton={false}
        watchMode
      />
    </>
  );
};

export default CodeEditor;
