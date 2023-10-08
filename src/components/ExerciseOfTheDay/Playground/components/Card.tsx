/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from "react";

const Card: FC<{
  children: ReactNode;
  selected?: boolean;
  [key: string]: any;
}> & {
  Title: FC<{ children: ReactNode }>;
  StatusTag: FC<{ status: "COMPLETED" | "INPROGRESS" }>;
} = ({ children, selected, ...rest }) => {
  return (
    <div className={`Card${selected ? " Selected" : ""}`} {...rest}>
      {children}
    </div>
  );
};

const CardTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <b>{children}</b>
    </div>
  );
};

const CardStatusTag: FC<{ status: "COMPLETED" | "INPROGRESS" }> = ({
  status,
}) => {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="CardStatusTag">
          <span
            className="CardStatusTagDot"
            style={{
              background: "var(--color-accent-green)",
            }}
          ></span>
          {"Completed"}
        </span>
      );
    case "INPROGRESS":
      return (
        <span className="CardStatusTag">
          <span
            className="CardStatusTagDot"
            style={{
              background: "var(--color-accent-orange)",
            }}
          ></span>
          {"In progress"}
        </span>
      );
    default:
      return null;
  }
};

Card.Title = CardTitle;
Card.StatusTag = CardStatusTag;
export default Card;
