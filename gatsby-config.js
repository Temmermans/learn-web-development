require("dotenv").config();

const fs = require(`fs`);
const path = require(`path`);

const yaml = require("js-yaml");

const courses = yaml.load(fs.readFileSync(path.join(__dirname, "content", "courses.yml"), "utf-8"));

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Learn Web Development`,
    author: {
      name: `Simon Temmerman`,
      summary: `, Co-founder of dScribe data and teacher @Syntra.`,
    },
    description: `Learn Web Development with Simon Temmerman`,
    siteUrl: `https://www.simon-says.com/`,
    social: {
      linkedin: "simontemmerman",
    },
    courses,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-shiki-twoslash",
            options: {
              theme: "github-light",
              addTryButton: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-remark-emojis",
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: "emoji-icon",
              // In order to avoid pattern mismatch you can specify
              // an escape character which will be prepended to the
              // actual pattern (e.g. `#:poop:`).
              // escapeCharacter: '#', // (default: '')
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: "inline",
                margin: "0",
                "margin-top": "1px",
                position: "relative",
                top: "5px",
                width: "25px",
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: [
          {
            query: `
            query {
              pages: allSitePage {
                nodes {
                  # querying id is required
                  id
                  component
                  path
                  componentChunkName
                  internal {
                    # querying internal.contentDigest is required
                    contentDigest
                    type
                  }
                }
              }
            }
          `,
          },
        ],
      },
    },
  ],
};
