import { Link } from "gatsby";
import * as React from "react";

import { rhythm, scale } from "../utils/typography";

interface ILayoutProps {
  children: React.ReactNode;
  location: {
    pathname: string;
  };
  title: string;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <Link to="/exercise-of-the-day">
          <button className="exercise-of-the-day-button">Exercise of the day</button>
        </Link>
      </>
    );
  } else {
    header = (
      <>
        <h3
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      </>
    );
  }
  return (
    <div
      style={{
        position: "relative",
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
