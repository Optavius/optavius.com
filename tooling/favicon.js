// Favicons from the logo O: svg, 32/48/180 png, and a PNG-based favicon.ico. Run from the project root: node tooling/favicon.js
const fs = require('fs'); const sharp = require('sharp');
const svg = (sw) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M34.7 12.6A16.5 16.5 0 1 0 34.7 27.4" fill="none" stroke="#006838" stroke-width="${sw}" stroke-linecap="butt"/></svg>`);
fs.writeFileSync('public/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.9 1.9 36.2 36.2"><path d="M34.7 12.6A16.5 16.5 0 1 0 34.7 27.4" fill="none" stroke="#006838" stroke-width="4" stroke-linecap="butt"/></svg>`);
const png = (size, sw) => sharp(svg(sw), { density: 600 }).resize(size, size).png().toBuffer();
(async () => {
  fs.writeFileSync('public/icon.png', await png(64, 6));
  fs.writeFileSync('public/apple-icon.png', await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } }).composite([{ input: await png(140, 6), gravity: 'centre' }]).png().toBuffer());
  const p32 = await png(32, 6.5), p16 = await png(16, 7);
  // ICO container with two PNG entries
  const entries = [[16, p16], [32, p32]]; const hdr = Buffer.alloc(6); hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length); let off = 6 + dir.length;
  entries.forEach(([s, b], i) => { const o = i * 16; dir.writeUInt8(s, o); dir.writeUInt8(s, o + 1); dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3); dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6); dir.writeUInt32LE(b.length, o + 8); dir.writeUInt32LE(off, o + 12); off += b.length; });
  fs.writeFileSync('public/favicon.ico', Buffer.concat([hdr, dir, ...entries.map((e) => e[1])]));
  console.log('favicons ok');
})();
