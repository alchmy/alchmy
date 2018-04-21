#!/usr/bin/env node
/**
 * Entry point to the SPINE component generator
 */

const program = require("commander")

program
  .description('An application for easily generating polymer elements')   
  .command('list <components|css-frameworks>','will list from online repositories')
  .command('add <name>', '(Recommended) adds from an online repo, the <name> must match that as an online repo.')
  .command('publish', 'will publish your app to ipfs')
  .parse(process.argv);
