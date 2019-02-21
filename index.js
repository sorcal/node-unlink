const fs = require('fs');
const path = require('path');


const REQUIRED_NODE_VERSION = 10;

function checkVersion() {
  const versionMatch = process.version.match(/^v(\d+)\..+/);
  return !!versionMatch && versionMatch[1] && parseInt(versionMatch[1], 10) >= REQUIRED_NODE_VERSION;
}

if (!checkVersion()) {
  return console.error('NodeJS version should be >= 10');
}

const list = fs.readdirSync(path.join(__dirname, 'node_modules'), { withFileTypes: true });
list
  .filter(packageObj => packageObj.isSymbolicLink())
  .forEach((symLinkObj) => {
    fs.unlink(path.join(__dirname, 'node_modules', symLinkObj.name), (err) => {
      if (err) throw err;
      console.log(`${symLinkObj.name} has been unlinked`);
    });
  });
