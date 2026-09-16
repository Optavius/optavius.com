// Serve a static export under a base path the way GitHub Pages does (extensionless -> .html, dirs -> index.html).
const http = require('http'), fs = require('fs'), path = require('path');
const root = process.argv[2] || 'out', base = process.argv[3] !== undefined ? process.argv[3] : (process.env.NEXT_PUBLIC_BASE_PATH || ''), port = Number(process.argv[4] || 3300);
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (!u.startsWith(base + '/') && u !== base) { res.writeHead(404); return res.end('outside base'); }
  u = u.slice(base.length) || '/';
  let p = path.join(root, u);
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p) && fs.existsSync(p + '.html')) p = p + '.html';
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end('not found'); }
  const ext = path.extname(p); const stat = fs.statSync(p);
  const range = req.headers.range;
  if (range && ext === '.mp4') { const [s, e] = range.replace('bytes=', '').split('-').map(Number); const end = e || stat.size - 1; res.writeHead(206, { 'Content-Type': types[ext], 'Content-Range': `bytes ${s}-${end}/${stat.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - s + 1 }); return fs.createReadStream(p, { start: s, end }).pipe(res); }
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Content-Length': stat.size }); fs.createReadStream(p).pipe(res);
}).listen(port, () => console.log('serving', root, 'at http://localhost:' + port + base));
