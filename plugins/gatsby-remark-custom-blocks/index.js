/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const visit = require("unist-util-visit");

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "", (node) => {
    const types = ["info", "warning", "success"];
    // if (Array.isArray(node.children) && node.children.length > 0 && node.children[0]?.value?.startsWith("[[")) {
    //   node.children.unshift({
    //     type: "html",
    //     value: `<p>hallo</p>`,
    //   });
    //   //<div class="custom-block info">
    //   //  <div class="custom-block-heading">This is a title!</div>
    //   //  <div class="custom-block-body"><p>content</p></div>
    //   //</div>

    //   const start = node.children[0].value;
    //   const type = start.value?.replace("[[", "").replace("]]", "");

    //   if (!types.includes(type)) return;

    //   const header = node.children[1];
    //   // all the children expect the first and last
    //   const body = node.children.slice(1, -1);
    //   const parsedChildren = [
    //     {
    //       type: "html",
    //       value: `<div class="custom-block-body">`,
    //     },
    //     {
    //       type: "html",
    //       value: `<div class="custom-block-heading">`,
    //     },
    //     header,
    //     {
    //       type: "html",
    //       value: `</div>`,
    //     },
    //     {
    //       type: "html",
    //       value: `<div class="custom-block-body">`,
    //     },
    //     ...body,
    //     {
    //       type: "html",
    //       value: `</div>`,
    //     },
    //     {
    //       type: "html",
    //       value: `</div>`,
    //     },
    //   ];

    //   // console.log(parsedChildren);

    //   node.children = [
    //     {
    //       type: "html",
    //       value: "<p>hallo</p>",
    //     },
    //   ];
    //   node.type = "html";
    // }
  });

  return markdownAST;
};
