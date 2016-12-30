#!/usr/bin/env node --harmony
const fs = require('fs');
const generate = require('project-name-generator');
const co = require('co');
const prompt = require('co-prompt');

let name = '';
let createDir = false;

co(function *() {
  while (!createDir) {
    name = generate().dashed;
    createDir = yield prompt.confirm(`Use name ${name} ? (y/n) `);
  }
  return name;
}).then(function(name) {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
    console.log(`Successfully created directory: ${name}`);
  } else {
    console.error(`There was a problem creating the directory`);
  }
  process.exit();
});
