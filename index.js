#! /usr/bin/env node

const fs = require('fs');
const path = require('path');


const nodeModulesDir = path.join('.', 'node_modules');
const packageNamelist = fs.readdirSync(nodeModulesDir);

let noLinkedModulesFound = true;
packageNamelist.filter((packageName) => {
  const packagePath = path.join(nodeModulesDir, packageName);
  const dirStat = fs.lstatSync(packagePath);
  if (dirStat.isSymbolicLink()) {
    noLinkedModulesFound = false;
    fs.unlink(packagePath, (err) => {
      if (err) throw err;
      console.log(`"${packageName}" module has been unlinked`);
    });
  }
});

if (noLinkedModulesFound) {
  console.log(`No linked modules found`);
}
