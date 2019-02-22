#! /usr/bin/env node

const fs = require('fs');
const path = require('path');


const nodeModulesDir = path.join('.', 'node_modules');
const packageNamelist = fs.readdirSync(nodeModulesDir);
if (packageNamelist.length === 0) {
  return console.log('No symbolic links found')
}

packageNamelist.forEach((packageName) => {
  const packagePath = path.join(nodeModulesDir, packageName);
  const dirStat = fs.lstatSync(packagePath);
  if (dirStat.isSymbolicLink()) {
    fs.unlink(packagePath, (err) => {
      if (err) throw err;
      console.log(`${packageName} has been unlinked`);
    });
  }
});
