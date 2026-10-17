import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.webp':'image/webp'};
http.createServer(async (req,res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // Also serve under the eventual GitHub Pages project prefix for verification.
    pathname = pathname.replace(/^\/belajaranak(?=\/|$)/, '') || '/';
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root) || pathname.split('/').some(s=>s.startsWith('.'))) {res.writeHead(403); return res.end('Forbidden');}
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(content);
  } catch {res.writeHead(404); res.end('Not found');}
}).listen(4173, '127.0.0.1', ()=>console.log('Belajar Anak: http://127.0.0.1:4173'));
