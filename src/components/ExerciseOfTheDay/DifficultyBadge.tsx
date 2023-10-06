import React, { FC } from "react";

const DifficultyBadge: FC<{ children: JSX.Element | string | number }> = ({ children }) => {
  return (
    <span
      style={{
        borderRadius: "0.5rem",
        padding: "0.25rem 0.5rem",
        background: "#eee",
        color: "#000",
        fontWeight: "bold",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

export default DifficultyBadge;
