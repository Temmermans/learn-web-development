/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const visit = require("unist-util-visit");

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "", (node) => {
    const types = ["info", "warning", "success"];
    if (Array.isArray(node.children) && node.children.length > 0 && node.children[0]?.value?.startsWith("[[")) {
      //<div class="custom-block info">
      //  <div class="custom-block-heading">This is a title!</div>
      //  <div class="custom-block-body"><p>content</p></div>
      //</div>

      const start = node.children[0].value;
      const type = start.replace("[[", "").replace("]]", "").trim();

      if (types.includes(type)) {
        // emoji and text is both the header
        const header = [node.children[1], node.children[2]];
        const body = node.children.slice(3, -1);

        const parsedChildren = [
          {
            type: "html",
            value: `<div class="custom-block ${type}">`,
          },
          {
            type: "html",
            value: `<div class="custom-block-heading">`,
          },
          ...header,
          {
            type: "html",
            value: `</div>`,
          },
          {
            type: "html",
            value: `<div class="custom-block-body">`,
          },
          ...body,
          {
            type: "html",
            value: `</div>`,
          },
          {
            type: "html",
            value: `</div>`,
          },
        ];

        node.children = parsedChildren;
      }
    }
  });

  return markdownAST;
};
