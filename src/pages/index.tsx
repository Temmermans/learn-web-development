import { Link, graphql } from "gatsby";
import * as React from "react";

import Bio from "../components/bio";
import Layout from "../components/layout";
import { rhythm } from "../utils/typography";

interface IBlogIndexProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string;
          frontmatter: { title: string; date: string; description: string };
          fields: { slug: string };
        };
      }[];
    };
    site: {
      siteMetadata: {
        title: string;
        courses: {
          id: string;
          title: string;
          summary: string;
          squareImage: string;
          disabled: boolean;
        }[];
      };
    };
  };
  location: {
    pathname: string;
  };
}

export function Head() {
  return (
    <>
      <title>Simon Says - Learn web development</title>
      <meta name="description" content="Learn web development" />
    </>
  );
}

const BlogIndex: React.FunctionComponent<IBlogIndexProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const courses = data.site.siteMetadata.courses;
  // const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      {courses
        .filter((c) => !c.disabled)
        .map(({ title, id, squareImage, summary }) => {
          return (
            <article className="course-summary" key={id}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <img style={{ float: "right" }} width={150} src={squareImage} />
                  <Link style={{ boxShadow: `none` }} to={`course/${id}`}>
                    {title}
                  </Link>
                </h3>
              </header>
              <section>
                <p>{summary}</p>
              </section>
            </article>
          );
        })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        courses {
          id
          title
          summary
          squareImage
          disabled
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { order: ASC } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            order
          }
        }
      }
    }
  }
`;
