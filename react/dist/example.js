(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
    }
}(this, function () {
    var fn = 'function',
        obj = 'object',
        nodeType = 'nodeType',
        textContent = 'textContent',
        setAttribute = 'setAttribute',
        attrMapString = 'attrMap',
        isNodeString = 'isNode',
        isElementString = 'isElement',
        d = typeof document === obj ? document : {},
        isType = function(a, type){
            return typeof a === type;
        },
        isNode = typeof Node === fn ? function (object) {
            return object instanceof Node;
        } :
        // in IE <= 8 Node is an object, obviously..
        function(object){
            return object &&
                isType(object, obj) &&
                (nodeType in object) &&
                isType(object.ownerDocument,obj);
        },
        isElement = function (object) {
            return crel[isNodeString](object) && object[nodeType] === 1;
        },
        isArray = function(a){
            return a instanceof Array;
        },
        appendChild = function(element, child) {
          if(!crel[isNodeString](child)){
              child = d.createTextNode(child);
          }
          element.appendChild(child);
        };


    function crel(){
        var args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel[attrMapString];

        element = crel[isElementString](element) ? element : d.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(!isType(settings,obj) || crel[isNodeString](settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined){
            element[textContent] = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                if(isType(settings[key],fn)){
                    element[key] = settings[key];
                }else{
                    element[setAttribute](key, settings[key]);
                }
            }else{
                var attr = attributeMap[key];
                if(typeof attr === fn){
                    attr(element, settings[key]);
                }else{
                    element[setAttribute](attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    crel[attrMapString] = {};

    crel[isElementString] = isElement;

    crel[isNodeString] = isNode;

    if(typeof Proxy !== 'undefined'){
        crel.proxy = new Proxy(crel, {
            get: function(target, key){
                !(key in crel) && (crel[key] = crel.bind(null, key));
                return crel[key];
            }
        });
    }

    return crel;
}));

},{}],2:[function(require,module,exports){
var ref = require("prosemirror-state");
var Plugin = ref.Plugin;
var PluginKey = ref.PluginKey;

var Rebaseable = function Rebaseable(step, inverted, origin) {
  this.step = step
  this.inverted = inverted
  this.origin = origin
};

// : (Transform, [Rebaseable], [Step]) → [Rebaseable]
// Undo a given set of steps, apply a set of other steps, and then
// redo them.
function rebaseSteps(steps, over, transform) {
  for (var i = steps.length - 1; i >= 0; i--) { transform.step(steps[i].inverted) }
  for (var i$1 = 0; i$1 < over.length; i$1++) { transform.step(over[i$1]) }
  var result = []
  for (var i$2 = 0, mapFrom = steps.length; i$2 < steps.length; i$2++) {
    var mapped = steps[i$2].step.map(transform.mapping.slice(mapFrom))
    mapFrom--
    if (mapped && !transform.maybeStep(mapped).failed) {
      transform.mapping.setMirror(mapFrom, transform.steps.length - 1)
      result.push(new Rebaseable(mapped, mapped.invert(transform.docs[transform.docs.length - 1]), steps[i$2].origin))
    }
  }
  return result
}
exports.rebaseSteps = rebaseSteps

// This state field accumulates changes that have to be sent to the
// central authority in the collaborating group and makes it possible
// to integrate changes made by peers into our local document. It is
// defined by the plugin, and will be available as the `collab` field
// in the resulting editor state.
var CollabState = function CollabState(version, unconfirmed) {
  // : number
  // The version number of the last update received from the central
  // authority. Starts at 0 or the value of the `version` property
  // in the option object, for the editor's value when the option
  // was enabled.
  this.version = version

  // : [Rebaseable]
  // The local steps that havent been successfully sent to the
  // server yet.
  this.unconfirmed = unconfirmed
};

function unconfirmedFrom(transform) {
  var result = []
  for (var i = 0; i < transform.steps.length; i++)
    { result.push(new Rebaseable(transform.steps[i],
                               transform.steps[i].invert(transform.docs[i]),
                               transform)) }
  return result
}

var collabKey = new PluginKey("collab")

// :: (?Object) → Plugin
//
// Creates a plugin that enables the collaborative editing framework
// for the editor.
//
//   config::- An optional set of options
//
//     version:: ?number
//     The starting version number of the collaborative editing.
//     Defaults to 0.
//
//     clientID:: ?union<number, string>
//     This client's ID, used to distinguish its changes from those of
//     other clients. Defaults to a random 32-bit number.
function collab(config) {
  if ( config === void 0 ) config = {};

  config = {version: config.version || 0,
            clientID: config.clientID == null ? Math.floor(Math.random() * 0xFFFFFFFF) : config.clientID}

  return new Plugin({
    key: collabKey,

    state: {
      init: function () { return new CollabState(config.version, []); },
      apply: function apply(tr, collab) {
        var newState = tr.getMeta(collabKey)
        if (newState)
          { return newState }
        if (tr.docChanged)
          { return new CollabState(collab.version, collab.unconfirmed.concat(unconfirmedFrom(tr))) }
        return collab
      }
    },

    config: config
  })
}
exports.collab = collab

// :: (state: EditorState, steps: [Step], clientIDs: [union<number, string>]) → Transaction
// Create a transaction that represents a set of new steps received from
// the authority. Applying this transaction moves the state forward to
// adjust to the authority's view of the document.
function receiveTransaction(state, steps, clientIDs) {
  // Pushes a set of steps (received from the central authority) into
  // the editor state (which should have the collab plugin enabled).
  // Will recognize its own changes, and confirm unconfirmed steps as
  // appropriate. Remaining unconfirmed steps will be rebased over
  // remote steps.
  var collabState = collabKey.getState(state)
  var version = collabState.version + steps.length
  var ourID = collabKey.get(state).spec.config.clientID

  // Find out which prefix of the steps originated with us
  var ours = 0
  while (ours < clientIDs.length && clientIDs[ours] == ourID) { ++ours }
  var unconfirmed = collabState.unconfirmed.slice(ours)
  steps = ours ? steps.slice(ours) : steps

  // If all steps originated with us, we're done.
  if (!steps.length)
    { return state.tr.setMeta(collabKey, new CollabState(version, unconfirmed)) }

  var nUnconfirmed = unconfirmed.length
  var tr = state.tr
  if (nUnconfirmed) {
    unconfirmed = rebaseSteps(unconfirmed, steps, tr)
  } else {
    for (var i = 0; i < steps.length; i++) { tr.step(steps[i]) }
    unconfirmed = []
  }

  var newCollabState = new CollabState(version, unconfirmed)
  return tr.setMeta("rebased", nUnconfirmed).setMeta("addToHistory", false).setMeta(collabKey, newCollabState)
}
exports.receiveTransaction = receiveTransaction

// :: (state: EditorState) → ?{version: number, steps: [Step], clientID: union<number, string>, origins: [Transaction]}
// Provides the data describing the editor's unconfirmed steps, which
// you'd send to the central authority. Returns null when there is
// nothing to send.
//
// `origins` holds the _original_ transactions that produced each
// steps. This can be useful for looking up time stamps and other
// metadata for the steps, but note that the steps may have been
// rebased, whereas the origin transactions are still the old,
// unchanged objects.
function sendableSteps(state) {
  var collabState = collabKey.getState(state)
  if (collabState.unconfirmed.length == 0) { return null }
  return {
    version: collabState.version,
    steps: collabState.unconfirmed.map(function (s) { return s.step; }),
    clientID: collabKey.get(state).spec.config.clientID,
    get origins() { return this._origins || (this._origins = collabState.unconfirmed.map(function (s) { return s.origin; })) }
  }
}
exports.sendableSteps = sendableSteps

// :: (EditorState) → number
// Get the version up to which the collab plugin has synced with the
// central authority.
function getVersion(state) {
  return collabKey.getState(state).version
}
exports.getVersion = getVersion

},{"prosemirror-state":"prosemirror-state"}],3:[function(require,module,exports){
var ref = require("prosemirror-example-setup");
var exampleSetup = ref.exampleSetup;
var buildMenuItems = ref.buildMenuItems;
var ref$1 = require("prosemirror-transform");
var Step = ref$1.Step;
var ref$2 = require("prosemirror-state");
var EditorState = ref$2.EditorState;
var ref$3 = require("prosemirror-view");
var EditorView = ref$3.EditorView;
var ref$4 = require("prosemirror-history");
var history = ref$4.history;
var ref$5 = require("prosemirror-collab");
var collab = ref$5.collab;
var receiveTransaction = ref$5.receiveTransaction;
var sendableSteps = ref$5.sendableSteps;
var getVersion = ref$5.getVersion;
var ref$6 = require("prosemirror-menu");
var MenuItem = ref$6.MenuItem;
var crel = require("crel");

var ref$7 = require("../client/schema");
var schema = ref$7.schema;
var ref$8 = require("../client/http");
var GET = ref$8.GET;
var POST = ref$8.POST;
var ref$9 = require("../client/reporter");
var Reporter = ref$9.Reporter;
var ref$10 = require("../client/comment");
var commentPlugin = ref$10.commentPlugin;
var commentUI = ref$10.commentUI;
var addAnnotation = ref$10.addAnnotation;
var annotationIcon = ref$10.annotationIcon;

// const serverAddress = "52.58.76.202:5555";
var serverAddress = "52.58.76.202:5555";

var report = new Reporter();

function badVersion(err) {
  return err.status == 400 && /invalid version/i.test(err);
}

var State = function State(edit, comm) {
  this.edit = edit;
  this.comm = comm;
};

var EditorConnection = function EditorConnection(report, conn) {
  this.report = report;
  this.state = new State(null, "start");
  this.request = null;
  this.backOff = 0;
  this.view = null;
  this.dispatch = this.dispatch.bind(this);
  this.start();
  this.conn = conn;
};

// All state changes go through this
EditorConnection.prototype.dispatch = function dispatch (action) {
    var this$1 = this;

  var newEditState = null;
  if (action.type == "loaded") {
    var editState = EditorState.create({
      doc: action.doc,
      plugins: exampleSetup({
        schema: schema,
        history: false,
        menuContent: menu.fullMenu
      }).concat([
        history({ preserveItems: true }),
        collab({ version: action.version }),
        commentPlugin,
        commentUI({
          dispatch: function (transaction) { return this$1.dispatch({ type: "transaction", transaction: transaction }); },
          getState: function () { return this$1.state.edit; }
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
    var sendable;
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
      this.view = window.view = new EditorView(
        document.querySelector("#editor"),
        {
          state: this.state.edit,
          dispatchTransaction: function (transaction) { return this$1.dispatch({ type: "transaction", transaction: transaction }); }
        }
      );
    }
  } else if (this.view) {
    this.view.destroy();
    this.view = null;
    window.view = undefined;
  }
};

// Load the document from the server and start up
// i.e. " + serverAddress +"/history/docs
EditorConnection.prototype.start = function start () {
    var this$1 = this;

  // console.log("calling /history/Example");
  this.run(GET("http://" + serverAddress + "/history/Example")).then(
    function (data) {
      data = JSON.parse(data);
      this$1.report.success();
      this$1.backOff = 0;
      this$1.dispatch({
        type: "loaded",
        doc: schema.nodeFromJSON(data.doc),
        version: data.version,
        users: data.users,
        comments: { version: data.commentVersion, comments: data.comments }
      });
    },
    function (err) {
      this$1.report.failure(err);
    }
  );
};

// Send a request for events that have happened since the version
// of the document that the client knows about. This request waits
// for a new version of the document to be created if the client
// is already up-to-date.
//
// Load the document history at /history/docHash, then connect the WS
// "users":1,"version":3104,"comments":[],"commentVersion":39}
EditorConnection.prototype.poll = function poll () {
  console.log("Called poll");
};

EditorConnection.prototype.sendable = function sendable (editState) {
  var steps = sendableSteps(editState);
  var comments = commentPlugin.getState(editState).unsentEvents();
  if (steps || comments.length) { return { steps: steps, comments: comments }; }
};

// Send the given steps to the server
EditorConnection.prototype.send = function send (editState, ref) {
    var steps = ref.steps;
    var comments = ref.comments;

  // console.log("Called send");
  var json = JSON.stringify({
    version: getVersion(editState),
    steps: steps ? steps.steps.map(function (s) { return s.toJSON(); }) : [],
    clientID: steps ? steps.clientID : 0,
    comment: comments || []
  });
  this.report.success();
  this.backOff = 0;
  var saveData = {
    doc: this.state.edit.doc,
    users: 1,
    version: 0,
    comments: [],
    commentVersion: 1
  };
  fetch("http://" + serverAddress + "/history/Example", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    //make sure to serialize your JSON body
    body: JSON.stringify(saveData)
  }).then(function (response) {
    // console.log("Saved the data");
    //do something awesome that makes the world a better place
  });
  var tr = steps
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
};

// Try to recover from an error
EditorConnection.prototype.recover = function recover (err) {
    var this$1 = this;

  var newBackOff = this.backOff ? Math.min(this.backOff * 2, 6e4) : 200;
  if (newBackOff > 1000 && this.backOff < 1000) { this.report.delay(err); }
  this.backOff = newBackOff;
  setTimeout(function () {
    if (this$1.state.comm == "recover") { this$1.dispatch({ type: "poll" }); }
  }, this.backOff);
};

EditorConnection.prototype.closeRequest = function closeRequest () {
  if (this.request) {
    this.request.abort();
    this.request = null;
  }
};

EditorConnection.prototype.run = function run (request) {
  return (this.request = request);
};

EditorConnection.prototype.close = function close () {
  this.closeRequest();
  if (this.view) {
    this.view.destroy();
    this.view = null;
    window.view = undefined;
  }
};

function repeat(val, n) {
  var result = [];
  for (var i = 0; i < n; i++)
    { result.push(val); }
  return result;
}

var annotationMenuItem = new MenuItem({
  title: "Add an annotation",
  run: addAnnotation,
  select: function (state) { return addAnnotation(state); },
  icon: annotationIcon
});
var menu = buildMenuItems(schema);
menu.fullMenu[0].push(annotationMenuItem);

var info = {
  name: document.querySelector("#docname"),
  users: document.querySelector("#users")
};
document.querySelector("#changedoc").addEventListener("click", function (e) {
  GET("http://" + serverAddress + "/collab_socket/").then(
    function (data) { return showDocList(e.target, JSON.parse(data)); },
    function (err) { return report.failure(err); }
  );
});

function userString(n) {
  if (n == null) { n = 1; }
  return "(" + n + " user" + (n == 1 ? "" : "s") + ")";
}

var docList;
function showDocList(node, list) {
  if (docList) { docList.parentNode.removeChild(docList); }

  var ul = (docList = document.body.appendChild(
    crel("ul", { class: "doclist" })
  ));
  list.forEach(function (doc) {
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

  var rect = node.getBoundingClientRect();
  ul.style.top = rect.bottom + 10 + pageYOffset - ul.offsetHeight + "px";
  ul.style.left = rect.left - 5 + pageXOffset + "px";

  ul.addEventListener("click", function (e) {
    if (e.target.nodeName == "LI") {
      ul.parentNode.removeChild(ul);
      docList = null;
      if (e.target.hasAttribute("data-name"))
        { location.hash =
          "#edit-" + encodeURIComponent(e.target.getAttribute("data-name")); }
      else { newDocument(); }
    }
  });
}
document.addEventListener("click", function () {
  if (docList) {
    docList.parentNode.removeChild(docList);
    docList = null;
  }
});

function newDocument() {
  var name = prompt("Name the new document", "");
  if (name) { location.hash = "#edit-" + encodeURIComponent(name); }
}

var connection = null;

function connectFromHash() {
  var isID = /^#edit-(.+)/.exec(location.hash);
  if (isID) {
    info.name.textContent = decodeURIComponent(isID[1]);
    if (window["WebSocket"]) {
      econn = window.connection = new EditorConnection(
        report,
        new WebSocket("ws://" + serverAddress + "/collab_socket/" + isID[1])
      );
      econn.conn.onopen = function(evt) {
        console.log("Connected to the WebSocket");
      };
      econn.conn.onclose = function(evt) {
        console.log("Closed WebSocket");
      };
      econn.conn.onmessage = function(evt) {
        try {
          console.log("Message received");
          var data = JSON.parse(evt.data);
          var tr = receiveTransaction(
            econn.state.edit, // doc json
            data.steps.map(function (j) { return Step.fromJSON(schema, j); }),
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
          window.connection.dispatch({type: "start"});
        }
      };
    } else {
      console.log("WebSocket not available");
    }
  }
}

addEventListener("hashchange", connectFromHash);
connectFromHash() || (location.hash = "#edit-Example");

},{"../client/comment":4,"../client/http":5,"../client/reporter":6,"../client/schema":7,"crel":1,"prosemirror-collab":2,"prosemirror-example-setup":"prosemirror-example-setup","prosemirror-history":"prosemirror-history","prosemirror-menu":"prosemirror-menu","prosemirror-state":"prosemirror-state","prosemirror-transform":"prosemirror-transform","prosemirror-view":"prosemirror-view"}],4:[function(require,module,exports){
var crel = require("crel")
var ref = require("prosemirror-state");
var Plugin = ref.Plugin;
var ref$1 = require("prosemirror-view");
var Decoration = ref$1.Decoration;
var DecorationSet = ref$1.DecorationSet;

var Comment = function Comment(text, id) {
  this.id = id
  this.text = text
};

function deco(from, to, comment) {
  return Decoration.inline(from, to, {class: "comment"}, {comment: comment})
}

var CommentState = function CommentState(version, decos, unsent) {
  this.version = version
  this.decos = decos
  this.unsent = unsent
};

CommentState.prototype.findComment = function findComment (id) {
  var current = this.decos.find()
  for (var i = 0; i < current.length; i++)
    { if (current[i].spec.comment.id == id) { return current[i] } }
};

CommentState.prototype.commentsAt = function commentsAt (pos) {
  return this.decos.find(pos, pos)
};

CommentState.prototype.apply = function apply (tr) {
  var action = tr.getMeta(commentPlugin), actionType = action && action.type
  if (!action && !tr.docChanged) { return this }
  var base = this
  if (actionType == "receive") { base = base.receive(action, tr.doc) }
  var decos = base.decos, unsent = base.unsent
  decos = decos.map(tr.mapping, tr.doc)
  if (actionType == "newComment") {
    decos = decos.add(tr.doc, [deco(action.from, action.to, action.comment)])
    unsent = unsent.concat(action)
  } else if (actionType == "deleteComment") {
    decos = decos.remove([this.findComment(action.comment.id)])
    unsent = unsent.concat(action)
  }
  return new CommentState(base.version, decos, unsent)
};

CommentState.prototype.receive = function receive (ref, doc) {
    var this$1 = this;
    var version = ref.version;
    var events = ref.events;
    var sent = ref.sent;

  var set = this.decos
  for (var i = 0; i < events.length; i++) {
    var event = events[i]
    if (event.type == "delete") {
      var found = this$1.findComment(event.id)
      if (found) { set = set.remove([found]) }
    } else { // "create"
      if (!this$1.findComment(event.id))
        { set = set.add(doc, [deco(event.from, event.to, new Comment(event.text, event.id))]) }
    }
  }
  return new CommentState(version, set, this.unsent.slice(sent))
};

CommentState.prototype.unsentEvents = function unsentEvents () {
    var this$1 = this;

  var result = []
  for (var i = 0; i < this.unsent.length; i++) {
    var action = this$1.unsent[i]
    if (action.type == "newComment") {
      var found = this$1.findComment(action.comment.id)
      if (found) { result.push({type: "create", id: action.comment.id,
                              from: found.from, to: found.to,
                              text: action.comment.text}) }
    } else {
      result.push({type: "delete", id: action.comment.id})
    }
  }
  return result
};

CommentState.init = function init (config) {
  var decos = config.comments.comments.map(function (c) { return deco(c.from, c.to, new Comment(c.text, c.id)); })
  return new CommentState(config.comments.version, DecorationSet.create(config.doc, decos), [])
};

var commentPlugin = new Plugin({
  state: {
    init: CommentState.init,
    apply: function apply(tr, prev) { return prev.apply(tr) }
  },
  props: {
    decorations: function decorations(state) { return this.getState(state).decos }
  }
})
exports.commentPlugin = commentPlugin

function randomID() {
  return Math.floor(Math.random() * 0xffffffff)
}

// Command for adding an annotation

exports.addAnnotation = function(state, dispatch) {
  var sel = state.selection
  if (sel.empty) { return false }
  if (dispatch) {
    var text = prompt("Annotation text", "")
    if (text)
      { dispatch(state.tr.setMeta(commentPlugin, {type: "newComment", from: sel.from, to: sel.to, comment: new Comment(text, randomID())})) }
  }
  return true
}

exports.annotationIcon = {
  width: 1024, height: 1024,
  path: "M512 219q-116 0-218 39t-161 107-59 145q0 64 40 122t115 100l49 28-15 54q-13 52-40 98 86-36 157-97l24-21 32 3q39 4 74 4 116 0 218-39t161-107 59-145-59-145-161-107-218-39zM1024 512q0 99-68 183t-186 133-257 48q-40 0-82-4-113 100-262 138-28 8-65 12h-2q-8 0-15-6t-9-15v-0q-1-2-0-6t1-5 2-5l3-5t4-4 4-5q4-4 17-19t19-21 17-22 18-29 15-33 14-43q-89-50-141-125t-51-160q0-99 68-183t186-133 257-48 257 48 186 133 68 183z"
}

// Comment UI

exports.commentUI = function(options) {
  return new Plugin({
    props: {
      decorations: function decorations(state) {
        return commentTooltip(state, options)
      }
    }
  })
}

function commentTooltip(state, options) {
  var sel = state.selection
  if (!sel.empty) { return null }
  var comments = commentPlugin.getState(state).commentsAt(sel.from)
  if (!comments.length) { return null }
  return DecorationSet.create(state.doc, [Decoration.widget(sel.from, renderComments(comments, options))])
}

function renderComment(comment, options) {
  var btn = crel("button", {class: "commentDelete", title: "Delete annotation"}, "×")
  btn.addEventListener("click", function () {
    options.dispatch(options.getState().tr.setMeta(commentPlugin, {type: "deleteComment", comment: comment}))
  })
  return crel("li", {class: "commentText"}, comment.text, btn)
}

function renderComments(comments, options) {
  return crel("div", {class: "tooltip-wrapper"},
              crel("ul", {class: "commentList"},
                   comments.map(function (c) { return renderComment(c.spec.comment, options); })))
}

},{"crel":1,"prosemirror-state":"prosemirror-state","prosemirror-view":"prosemirror-view"}],5:[function(require,module,exports){
// A simple wrapper for XHR.
function req(conf) {
  var req = new XMLHttpRequest(), aborted = false
  var result = new Promise(function (success, failure) {
    req.open(conf.method, conf.url, true)
    req.addEventListener("load", function () {
      if (aborted) { return }
      if (req.status < 400) {
        success(req.responseText)
      } else {
        var text = req.responseText
        if (text && /html/.test(req.getResponseHeader("content-type"))) { text = makePlain(text) }
        var err = new Error("Request failed: " + req.statusText + (text ? "\n\n" + text : ""))
        err.status = req.status
        failure(err)
      }
    })
    // req.addEventListener("error", () => { if (!aborted) failure(new Error("Network error")) })
    if (conf.headers) { for (var header in conf.headers) { req.setRequestHeader(header, conf.headers[header]) } }
      // req.setRequestHeader();
    req.send(conf.body || null)
  })
  result.abort = function () {
    if (!aborted) {
      req.abort()
      aborted = true
    }
  }
  return result
}
exports.req = req

function makePlain(html) {
  var elt = document.createElement("div")
  elt.innerHTML = html
  return elt.textContent.trimLeft().replace(/\n[^]*/, "")
}

function GET(url) {
  return req({url: url, method: "GET"})
}
exports.GET = GET

function POST(url, body, type) {

  return req({url: url, method: "POST", body: body, headers: [{"Content-Type": type}]})
}
exports.POST = POST

},{}],6:[function(require,module,exports){
var Reporter = function Reporter() {
  this.state = this.node = null
  this.setAt = 0
};

Reporter.prototype.clearState = function clearState () {
  if (this.state) {
    document.body.removeChild(this.node)
    this.state = this.node = null
    this.setAt = 0
  }
};

Reporter.prototype.failure = function failure (err) {
  this.show("fail", err.toString())
};

Reporter.prototype.delay = function delay (err) {
  if (this.state == "fail") { return }
  this.show("delay", err.toString())
};

Reporter.prototype.show = function show (type, message) {
  this.clearState()
  this.state = type
  this.setAt = Date.now()
  this.node = document.body.appendChild(document.createElement("div"))
  this.node.className = "ProseMirror-report ProseMirror-report-" + type
  this.node.textContent = message
};

Reporter.prototype.success = function success () {
    var this$1 = this;

  if (this.state == "fail" && this.setAt > Date.now() - 1000 * 10)
    { setTimeout(function () { return this$1.success(); }, 5000) }
  else
    { this.clearState() }
};
exports.Reporter = Reporter

},{}],7:[function(require,module,exports){
var ref = require("prosemirror-model");
var Schema = ref.Schema;
var ref$1 = require("prosemirror-schema-basic");
var base = ref$1.schema;
var ref$2 = require("prosemirror-schema-list");
var addListNodes = ref$2.addListNodes;

exports.schema = new Schema({
  nodes: addListNodes(base.spec.nodes, "paragraph block*", "block"),
  marks: base.spec.marks
})

},{"prosemirror-model":"prosemirror-model","prosemirror-schema-basic":"prosemirror-schema-basic","prosemirror-schema-list":"prosemirror-schema-list"}],8:[function(require,module,exports){
require("../client/collab.js");

},{"../client/collab.js":3}]},{},[8]);
