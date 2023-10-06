import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

import { rhythm } from "../utils/typography";

interface IPureBioProps {
  author: {
    name: string;
    summary: string;
  };
  social: {
    twitter: string;
    linkedin: string;
  };
}

const PureBio: React.FunctionComponent<IPureBioProps> = ({ author, social }) => {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        alt={author.name}
        src="profile-pic.png"
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: 120,
          borderRadius: `50%`,
        }}
      />
      <p
        style={{
          flex: 1,
        }}
      >
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://linkedin.com/in/${social.linkedin}`}>You should connect with him on LinkedIn.</a>
      </p>
    </div>
  );
};

const Bio = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            linkedin
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return <PureBio author={author} social={social} />;
};

export default Bio;
export { IPureBioProps, PureBio };
