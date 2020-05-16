const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

function get_page(url) {
  if (url == "/") {
    return ["index.html", "text/html"];
  } else if (url == "/webpage.js") {
    return ["webpage.js", "text/javascript"];
  } else if (url == "/style.css") {
    return ["style.css", "text/css"];
  } else {
    console.log("Could not find page", url);
    return ["404.html", "text/html"];
  }
}

const server = http.createServer((req, res) => {
  page = get_page(req.url);
  fs.readFile(page[0], function (err, data) {
    if (err) {
      console.log(err);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end("File not found");
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', page[1]);
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

