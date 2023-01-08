import * as React from "react";
import { Link } from "gatsby";
import { ICourse } from "../templates/course-page";

import { rhythm } from "../utils/typography";

interface ICourseLayoutProps {
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
  );
};

export default CourseLayout;
