const fs = require(`fs`);
const path = require(`path`);

const PACKAGE_JSON_PATH = require("pkg-up").sync();
const PROJECT_ROOT_PATH = path.join(PACKAGE_JSON_PATH, "..");

const yaml = require("js-yaml");

const courses = yaml.load(fs.readFileSync(path.join(PROJECT_ROOT_PATH, "content", "courses.yml"), "utf-8"));

module.exports = {
  pathPrefix: "/learn-web-development",
  siteMetadata: {
    title: `Learn Web Development`,
    author: {
      name: `Simon Temmerman`,
      summary: `, Co-founder of dScribe data and teacher @Syntra.`,
    },
    description: `Learn Web Development with Simon Temmerman`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                danger: {
                  classes: "danger",
                  title: "required",
                },
                info: {
                  classes: "info",
                  title: "optional",
                },
                warning: {
                  classes: "warning",
                  title: "optional",
                },
                question: {
                  classes: "question",
                  title: "optional",
                },
                vspace: {
                  classes: "vspace",
                  title: "optional",
                },
              },
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
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
