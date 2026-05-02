/**
 * Build script — copies all site files into /public
 * Vercel runs this, then serves /public as the static output
 */
const fs   = require('fs');
const path = require('path');

const SRC  = __dirname;
const DEST = path.join(__dirname, 'public');

// Files and folders to copy
const INCLUDE = [
  'index.html',
  'logo.png',
  'css',
  'js',
  'video',
  'assets'
];

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      copyFile(s, d);
    }
  }
}

// Clean public dir
if (fs.existsSync(DEST)) fs.rmSync(DEST, { recursive: true, force: true });
mkdirp(DEST);

// Copy everything
for (const item of INCLUDE) {
  const src  = path.join(SRC, item);
  const dest = path.join(DEST, item);
  if (!fs.existsSync(src)) continue;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
    console.log(`  copied dir  → public/${item}`);
  } else {
    copyFile(src, dest);
    console.log(`  copied file → public/${item}`);
  }
}

console.log('\nBuild complete. Output: /public');
