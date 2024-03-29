import { Link, graphql } from "gatsby";
import * as React from "react";
import { useEffect } from "react";

import Layout from "../components/layout";
import { rhythm, scale } from "../utils/typography";

import setupTwoslashHovers from "../utils/setup-two-slash";
import { ICourse } from "./course-page";

interface IPost {
  tableOfContents: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    course: string;
    credits: string;
  };
  fields: { slug: string };
  html: string;
}
interface IBlogPostTemplateProps {
  data: {
    markdownRemark: IPost;

    site: {
      siteMetadata: {
        title: string;
        courses: ICourse[];
      };
    };
  };
  pageContext: {
    previous: IPost;
    next: IPost;
  };
  location: {
    pathname: string;
  };
}

function makeHTMLAdjustments(raw: string): string {
  return (
    raw &&
    raw.replace(
      /<a class='playground-link' href='https:\/\/www.typescriptlang/g,
      `<a class='playground-link try-code-link' target="_blank" href='https://www.typescriptlang`
    )
  );
}

const BlogPostTemplate: React.FunctionComponent<IBlogPostTemplateProps> = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  useEffect(setupTwoslashHovers, []);

  const postHtml = makeHTMLAdjustments(post.html);
  const course = data.site.siteMetadata.courses.find((c) => c.id === post.frontmatter.course);
  if (!course) throw new Error(`Undefined course: ${post.frontmatter.course}`);

  const hasToc = !!post.tableOfContents && post.tableOfContents.trim() !== "";
  const toc = hasToc ? (
    <div className="post-toc">
      <div className="post-toc__title">Table of Contents</div>

      <section className="post-toc__content" dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
    </div>
  ) : (
    ""
  );
  const credits = post.frontmatter.credits ? (
    <p>
      All credits to creator of content before I tweaked it a bit:{" "}
      {post.frontmatter.credits.split(",").map((c, i) => {
        const [name, url] = c.split("|");
        return (
          <a target="_blank" key={`${i}-${url}`} href={url}>
            {name}
          </a>
        );
      })}
    </p>
  ) : null;

  return (
    <Layout location={location} title={siteTitle}>
      <article className="blog-post">
        <header>
          <Link
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
            to={`/course/${course.id}`}
            rel="next"
            className="course-title-link"
          >
            <span className="course-title">{course.title}</span>
          </Link>
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && previous.fields && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && next.fields && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        {toc}
        <section className="post-body" dangerouslySetInnerHTML={{ __html: postHtml }} />

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && previous.fields && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && next.fields && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>{credits}</footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        courses {
          id
          title
          summary
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(maxDepth: 4)
      fields {
        slug
      }
      frontmatter {
        title
        course
        credits
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
