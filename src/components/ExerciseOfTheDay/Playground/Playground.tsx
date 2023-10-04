import React, { FC } from "react";
import CodeChallenge from "./components/CodeChallenge";
import Header from "./components/Header";
import History from "./components/History";
import "./styles.css";

const Playground: FC = () => {
  return (
    <div className="container">
      <Header />
      <History />
      <CodeChallenge />
    </div>
  );
};

export default Playground;
