const { Schema } = require("prosemirror-model");
const { schema: base } = require("prosemirror-schema-basic");
const { addListNodes } = require("prosemirror-schema-list");

window.setTimeout(() => {
  if (window.MathJax) {
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        processEscapes: true
      },
      displayAlign: "left"
    });
  } else {
    console.log("400ms for MathJax was not enough");
  }
}, 400);

// Math node schema
const mathNode = {
  attrs: { id: { default: "" }, tex: { default: "" } },
  draggable: true,
  toDOM: node => {
    let n = ["span", { id: node.attrs.tex }, "\\[" + node.attrs.tex + "\\]"];
    if (window.MathJax) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
    return n;
  },
  parseDOM: [
    {
      tag: "span",
      getAttrs: dom => {
        // let tex = dom.getAttribute("tex");
        if (window.MathJax) {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        return dom;
      }
    }
  ],

  inline: true,
  group: "inline"
};

// Math mark schema

exports.schema = new Schema({
  nodes: base.spec.nodes.addBefore("image", "mathNode", mathNode),
  marks: base.spec.marks
});
