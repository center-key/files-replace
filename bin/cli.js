#!/usr/bin/env node
///////////////////
// files-replace //
// MIT License   //
///////////////////

// Usage in package.json:
//    "scripts": {
//       "make-web": "files-replace src/web dist/website --pkg
//       "the-end": "files-replace poems dystopian-poems --find=humans --replacement=robots
//    },
//
// Usage from command line:
//    $ npm install --global files-replace
//    $ files-replace src/web --ext=.html docs --pkg --quiet
//
// Contributors to this project:
//    $ cd files-replace
//    $ npm install
//    $ npm test
//    $ node bin/cli.js --cd=spec/fixtures source target --pkg --find=insect --replacement=A.I.

// Imports
import { filesReplace } from '../dist/files-replace.js';
import chalk from 'chalk';
import fs    from 'fs';
import log   from 'fancy-log';
import path  from 'path';

// Parameters
const validFlags =  ['cd', 'find', 'ext', 'pkg', 'quiet', 'replacement', 'summary'];
const args =        process.argv.slice(2);
const flags =       args.filter(arg => /^--/.test(arg));
const flagMap =     Object.fromEntries(flags.map(flag => flag.replace(/^--/, '').split('=')));
const flagOn =      Object.fromEntries(validFlags.map(flag => [flag, flag in flagMap]));
const invalidFlag = Object.keys(flagMap).find(key => !validFlags.includes(key));
const params =      args.filter(arg => !/^--/.test(arg));

// Data
const source = params[0];  //origin file or folder
const target = params[1];  //destination folder

// Reporting
const printReport = (results) => {
   const name =      chalk.gray('files-replace');
   const source =    chalk.blue.bold(results.source);
   const target =    chalk.magenta(results.target);
   const arrow =     { big: chalk.gray.bold('➤➤➤'), little: chalk.gray.bold(' ⟹  ') };  //extra space for alignment
   const infoColor = results.count ? chalk.white : chalk.red.bold;
   const info =      infoColor(`(files: ${results.count}, ${results.duration}ms)`);
   const logFile =   (file) => log(name, chalk.white(file.origin), arrow.little, chalk.green(file.dest));
   log(name, source, arrow.big, target, info);
   if (!flagOn.summary)
      results.files.forEach(logFile);
   };

// Transform Files
const error =
   invalidFlag ?       'Invalid flag: ' + invalidFlag :
   !source ?           'Missing source folder.' :
   !target ?           'Missing target folder.' :
   params.length > 2 ? 'Extraneous parameter: ' + params[2] :
   null;
if (error)
   throw Error('[files-replace] ' + error);
const sourceFile =   path.join(flagMap.cd ?? '', source);
const isFile =       fs.existsSync(sourceFile) && fs.statSync(sourceFile).isFile();
const sourceFolder = isFile ? path.dirname(source) : source;
const options = {
   cd:          flagMap.cd ?? null,
   extensions:  flagMap.ext?.split(',') ?? [],
   filename:    isFile ? path.basename(source) : null,
   find:        flagMap.find ?? null,
   replacement: flagMap.replacement ?? null,
   pkg:         flagOn.pkg,
   };
const results = filesReplace.transform(sourceFolder, target, options);
if (!flagOn.quiet)
   printReport(results);
