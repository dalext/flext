import React from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
const { exampleSetup, buildMenuItems } = require("prosemirror-example-setup");
const { Step } = require("prosemirror-transform");
const { EditorState } = require("prosemirror-state");
const { EditorView } = require("prosemirror-view");
const { history } = require("prosemirror-history");
const {
  collab,
  receiveTransaction,
  sendableSteps,
  getVersion
} = require("prosemirror-collab");

const { MenuItem } = require("prosemirror-menu");
const crel = require("crel");
const { schema } = require("../../client/schema");
const { GET, POST } = require("../../client/http");
const { Reporter } = require("../../client/reporter");
const {
  commentPlugin,
  commentUI,
  addAnnotation,
  annotationIcon
} = require("../../client/comment");

import {
  schema as markdownSchema,
  defaultMarkdownParser,
  defaultMarkdownSerializer
} from "prosemirror-markdown";

const report = new Reporter();

function badVersion(err) {
  return err.status == 400 && /invalid version/i.test(err);
}

function repeat(val, n) {
  let result = [];
  for (let i = 0; i < n; i++) result.push(val);
  return result;
}

const annotationMenuItem = new MenuItem({
  title: "Add an annotation",
  run: addAnnotation,
  select: state => addAnnotation(state),
  icon: annotationIcon
});
let info = {};

let menu = buildMenuItems(schema);

menu.fullMenu[0].push(
  new MenuItem({
    title: "Math",
    label: "Math",
    select(state) {
      return true; // always
    },
    run(state, dispatch) {
      let tex = window.prompt("Insert block math", "");
      if (tex) {
        let newNode = schema.nodes.mathNode.create({ tex: tex });
        dispatch(state.tr.replaceSelectionWith(newNode));
        // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }
    }
  })
);

class Editor extends React.Component {
  componentDidMount() {
    // if (window.MathJax) {
    //   MathJax.Hub.Config({
    //     extensions: ["tex2jax.js"],
    //     jax: ["input/TeX", "output/HTML-CSS"],
    //     displayAlign: "left",
    //     tex2jax: {
    //       inlineMath: [["$", "$"], ["\\(", "\\)"]],
    //       displayMath: [["$$", "$$"], ["\\[", "\\]"]]
    //     }
    //   });
    // } else {
    //   console.log("MathJax not found");
    // }
    menu.fullMenu[0].push(annotationMenuItem);
    info = {
      name: document.querySelector("#docname"),
      users: document.querySelector("#users")
    };
    document.addEventListener("click", () => {
      if (docList) {
        docList.parentNode.removeChild(docList);
        docList = null;
      }
    });
    // addEventListener("hashchange", connectFromHash);
    connectFromHash() ||
      (location.hash = window.connection.editorHash || "#Example");
  }
  componentWillUnMount() {
    // delete(window.connection);
  }
  componentWillMount() {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = SERVER_LOCATION + "/css/editor.css";
    document.body.appendChild(cssLink);
  }
  render() {
    return (
      <div className="container">
        <div className="editorContainer">
          <div id="editor" />
          <div className="docinfo">
            Document id:{" "}
            <span id="connected">
              <span id="docname">None</span>
              <span id="users" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;

class State {
  constructor(edit, comm) {
    this.edit = edit;
    this.comm = comm;
  }
}

class EditorConnection {
  constructor(report, conn) {
    this.report = report;
    this.state = new State(null, "start");
    this.request = null;
    this.backOff = 0;
    this.view = null;
    this.dispatch = this.dispatch.bind(this);
    this.start();
    this.conn = conn;
  }

  // All state changes go through this
  dispatch(action) {
    let newEditState = null;
    if (action.type == "loaded") {
      let editState = EditorState.create({
        doc: action.doc,
        plugins: exampleSetup({
          schema,
          history: false,
          menuContent: menu.fullMenu
        }).concat([
          history({ preserveItems: true }),
          collab({ version: action.version }),
          commentPlugin,
          commentUI({
            dispatch: transaction =>
              this.dispatch({ type: "transaction", transaction }),
            getState: () => this.state.edit
          })
        ]),
        comments: { version: 0, comments: [] }
      });
      this.state = new State(editState, "poll");
      this.poll();
    } else if (action.type == "restart") {
      this.state = new State(null, "start");
      this.start();
    } else if (action.type == "poll") {
      this.state = new State(this.state.edit, "poll");
      this.poll();
    } else if (action.type == "recover") {
      if (action.error.status && action.error.status < 500) {
        this.report.failure(action.error);
        this.state = new State(null, null);
      } else {
        this.state = new State(this.state.edit, "recover");
        this.recover(action.error);
      }
    } else if (action.type == "transaction") {
      newEditState = this.state.edit.apply(action.transaction);
    }

    if (newEditState) {
      let sendable;
      if (newEditState.doc.content.size > 40000) {
        console.log("size > 40000");
        if (this.state.comm != "detached") {
          this.report.failure("Document too big. Detached.");
        }
        this.state = new State(newEditState, "detached");
      } else if (
        (this.state.comm == "poll" || action.requestDone) &&
        (sendable = this.sendable(newEditState))
      ) {
        this.closeRequest();
        this.state = new State(newEditState, "send");
        this.send(newEditState, sendable);
      } else if (action.requestDone) {
        this.state = new State(newEditState, "poll");
        this.poll();
      } else {
        this.state = new State(newEditState, this.state.comm);
      }
    }

    // Sync the editor with this.state.edit
    if (this.state.edit) {
      if (this.view) {
        this.view.updateState(this.state.edit);
      } else {
        // this.view = window.view = new EditorView(
        //   document.querySelector("#editor"),
        //   {
        //     state: EditorState.create({
        //       doc: defaultMarkdownParser.parse(content),
        //       plugins: exampleSetup({ schema })
        //     })
        //   }
        // );
        this.view = window.view = new EditorView(
          document.querySelector("#editor"),
          {
            state: this.state.edit,
            dispatchTransaction: transaction =>
              this.dispatch({ type: "transaction", transaction })
          }
        );
      }
    } else if (this.view) {
      this.view.destroy();
      this.view = null;
      window.view = undefined;
    }
  }

  // Load the document from the server and start up
  // i.e. " + SERVER_ADDR +  "/history/docs
  start() {
    console.log(document.location.href);
    let uri = document.location.href.split("#");
    // let exampleHash = "editor#edit-Example";
    // Load the example document
    this.editorHash = uri[uri.length - 1];
    // this.run(GET(SERVER_ADDR + "/history/" + this.editorHash)).then(
    //   data => {
    //     // data = JSON.parse(data);
    //     this.report.success();
    //     this.backOff = 0;
    //     this.dispatch({
    //       type: "loaded",
    //       doc: defaultMarkdownParser.parse(data),
    //       version: data.version,
    //       users: data.users,
    //       comments: { version: data.commentVersion, comments: data.comments }
    //     });
    //   },
    //   err => {
    //     this.report.failure(err);
    //   }
    // );
    this.run(GET(SERVER_ADDR + "/history/" + this.editorHash)).then(
      data => {
        data = JSON.parse(data);
        this.report.success();
        this.backOff = 0;
        this.dispatch({
          type: "loaded",
          doc: schema.nodeFromJSON(data.doc),
          version: data.version,
          users: data.users,
          comments: { version: data.commentVersion, comments: data.comments }
        });
      },
      err => {
        this.report.failure(err);
      }
    );
  }

  // Send a request for events that have happened since the version
  // of the document that the client knows about. This request waits
  // for a new version of the document to be created if the client
  // is already up-to-date.
  //
  // Load the document history at /history/docHash, then connect the WS
  // "users":1,"version":3104,"comments":[],"commentVersion":39}
  poll() {
    // console.log("Called poll");
  }

  sendable(editState) {
    let steps = sendableSteps(editState);
    let comments = commentPlugin.getState(editState).unsentEvents();
    if (steps || comments.length) return { steps, comments };
  }

  // Send the given steps to the server
  send(editState, { steps, comments }) {
    // console.log("Called send");
    let json = JSON.stringify({
      version: getVersion(editState),
      steps: steps ? steps.steps.map(s => s.toJSON()) : [],
      clientID: steps ? steps.clientID : 0,
      comment: comments || []
    });
    this.report.success();
    this.backOff = 0;
    let saveData = {
      doc: this.state.edit.doc,
      users: 1,
      version: 0,
      comments: [],
      commentVersion: 1
    };
    // fetch(SERVER_ADDR + "/history/" + this.editorHash, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   //make sure to serialize your JSON body
    //   body: defaultMarkdownSerializer.serialize(this.state.edit.doc)
    // }).then(response => {
    //   // console.log("Saved the data");
    //   //do something awesome that makes the world a better place
    // });
    fetch(SERVER_ADDR + "/history/" + this.editorHash, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(saveData)
    }).then(response => {
      // console.log("Saved the data");
      //do something awesome that makes the world a better place
    });
    let tr = steps
      ? receiveTransaction(
          this.state.edit,
          steps.steps,
          repeat(steps.clientID, steps.steps.length)
        )
      : this.state.edit.tr;
    tr.setMeta(commentPlugin, {
      type: "receive",
      version: JSON.parse(json).commentVersion,
      events: [],
      sent: comments.length
    });
    this.conn.send(json);
    this.dispatch({
      type: "transaction",
      transaction: tr,
      requestDone: true
    });
  }

  // Try to recover from an error
  recover(err) {
    let newBackOff = this.backOff ? Math.min(this.backOff * 2, 6e4) : 200;
    if (newBackOff > 1000 && this.backOff < 1000) this.report.delay(err);
    this.backOff = newBackOff;
    setTimeout(() => {
      if (this.state.comm == "recover") this.dispatch({ type: "poll" });
    }, this.backOff);
  }

  closeRequest() {
    if (this.request) {
      this.request.abort();
      this.request = null;
    }
  }

  run(request) {
    return (this.request = request);
  }

  close() {
    this.closeRequest();
    if (this.view) {
      this.view.destroy();
      this.view = null;
      window.view = undefined;
    }
  }
}

function userString(n) {
  if (n == null) n = 1;
  return "(" + n + " user" + (n == 1 ? "" : "s") + ")";
}

let docList;
function showDocList(node, list) {
  if (docList) docList.parentNode.removeChild(docList);
  let ul = (docList = document.body.appendChild(
    crel("ul", { class: "doclist" })
  ));
  list.forEach(doc => {
    ul.appendChild(
      crel("li", { "data-name": doc.id }, doc.id + " " + userString(doc.users))
    );
  });
  ul.appendChild(
    crel(
      "li",
      {
        "data-new": "true",
        style: "border-top: 1px solid silver; margin-top: 2px"
      },
      "Create a new document"
    )
  );

  let rect = node.getBoundingClientRect();
  ul.style.top = rect.bottom + 10 + pageYOffset - ul.offsetHeight + "px";
  ul.style.left = rect.left - 5 + pageXOffset + "px";

  ul.addEventListener("click", e => {
    if (e.target.nodeName == "LI") {
      ul.parentNode.removeChild(ul);
      docList = null;
      if (e.target.hasAttribute("data-name"))
        location.hash =
          "#edit-" + encodeURIComponent(e.target.getAttribute("data-name"));
      else newDocument();
    }
  });
}

function newDocument() {
  let name = prompt("Name the new document", "");
  if (name) location.hash = encodeURIComponent(name);
}

let econn = null;
//
function connectFromHash() {
  let uri = document.location.href.split("#");
  let isID = uri[uri.length - 1];
  if (isID) {
    info.name.textContent = decodeURIComponent(isID);
    if (window["WebSocket"]) {
      // first disconnect
      econn = window.connection = new EditorConnection(
        report,
        new WebSocket(COLLAB_SOCKET + "/collab_socket/" + isID)
      );
      econn.conn.onopen = function(evt) {
        console.log("Connected to the WebSocket");
      };
      econn.conn.onclose = function(evt) {
        console.log("Closed WebSocket");
      };
      econn.conn.onmessage = function(evt) {
        try {
          // console.log("Message received");
          var data = JSON.parse(evt.data);
          let tr = receiveTransaction(
            econn.state.edit, // doc json
            data.steps.map(j => Step.fromJSON(schema, j)),
            [data.clientID]
          );
          tr.setMeta(commentPlugin, {
            type: "receive",
            version: data.commentVersion,
            events: data.comment,
            sent: 0
          });
          econn.dispatch({
            type: "transaction",
            transaction: tr,
            requestDone: true
          });
        } catch (e) {
          // revert to server version
          window.connection.dispatch({ type: "start" });
        }
      };
    } else {
      console.log("WebSocket not available");
    }
  }
}
