// Local preview: `node serve.js` then open http://localhost:8787
// Mirrors Cloudflare Pages: serves ./public, and /directing → directing.html
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");
const port = process.env.PORT || 8787;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".mp4": "video/mp4", ".ico": "image/x-icon", ".json": "application/json",
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let file = path.normalize(path.join(root, p));
  if (file.indexOf(root) !== 0) { res.writeHead(403); return res.end(); }
  if (p.endsWith("/")) file = path.join(file, "index.html");
  else if (!path.extname(file)) file += ".html";
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving public/ at http://localhost:${port}`));
