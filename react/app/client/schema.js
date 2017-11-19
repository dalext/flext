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
  draggable: false,
  toDOM: node => {
    console.log("toDOM");
    if (window.MathJax) {
      console.log("Calling MathJax");
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
      console.log("Bug");
    }
    return ["span", { id: node.attrs.tex }, "$$" + node.attrs.tex + "$$"];
  },
  parseDOM: [
    {
      tag: "span",
      getAttrs: dom => {
        // let tex = dom.getAttribute("tex");
        console.log("parseDOM");
        if (window.MathJax) {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        return dom;
      }
    }
  ],

  inline: false,
  group: "block"
};

// Math mark schema

exports.schema = new Schema({
  nodes: base.spec.nodes.addBefore("image", "mathNode", mathNode),
  marks: base.spec.marks
});
