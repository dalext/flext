const {createServer} = require("http")
const {handleCollabRequest} = require("./server")

const port = 8000

// The collaborative editing document server.
createServer((req, resp) => {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  if (!handleCollabRequest(req, resp)) {
    resp.writeHead(404, {"Content-Type": "text/plain"})
    // console.log(req);
    resp.end("Not found")
  }
}).listen(port, "0.0.0.0")

console.log("Collabs demo server listening on " + port)
