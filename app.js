const http = require("http");
const fs = require("fs");

http.createServer(function(req, res) {
  var url = req.url.split("?")[0];
  if(url === "/") url = "/index.html";
  var allowlistedUrls = ["/index.html", "/main.css", "/main.js", "/README.md", "/TODO.md"];
  if(!allowlistedUrls.includes(url)){
    res.writeHead(404);
    return res.end("404 Not Found");
  }
  fs.readFile(__dirname + url, function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("500 Server Error");
    }
    var mime = {"html": "text/html", "css": "text/css", "js": "text/javascript"}[url.split(".")[1]];
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  });
}).listen(process.env.PORT);