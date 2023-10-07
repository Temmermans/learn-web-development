import { Link } from "gatsby";
import * as React from "react";
import { ICourse } from "../templates/course-page";

import { rhythm } from "../utils/typography";
import Search from "./search";

interface ICourseLayoutProps {
  children: JSX.Element | React.ReactNode;
  courses: ICourse[];
  padTop: boolean;
}

const CourseLayout: React.FunctionComponent<ICourseLayoutProps> = ({ children }) => {
  const header = (
    <Link
      activeClassName="active"
      style={{
        boxShadow: `none`,
        color: `inherit`,
      }}
      to={`/`}
    >
      Home
    </Link>
  );

  return (
    <>
      <section id="layout-header">
        <Search />
        <Link to="/exercise-of-the-day">
          <button className="exercise-of-the-day-button">Exercise of the day</button>
        </Link>
      </section>
      <div
        className="course-page"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default CourseLayout;
