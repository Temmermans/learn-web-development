import { graphql } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";

interface INotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: {
    pathname: string;
  };
}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
