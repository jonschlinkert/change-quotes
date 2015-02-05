#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var symbol = require('log-symbols');
var argv = require('minimist')(process.argv.slice(2));
var change = require('./');

var src  = argv.s || argv.src  || argv._[0];
var dest = argv.d || argv.dest || src;
var type = argv.t || argv.type || 'single';


if (!src) {
  var msg = chalk.red('  please specify a src file as the first arg, or with ')
    + chalk.bold('-s') + chalk.red(' or ')
    + chalk.bold('--src') + '.';
  console.log();
  console.log(msg);
}

function typeMsg() {
  var msg = chalk.red('  please specify a valid type with ')
    + chalk.bold('-t') + chalk.red(' or ')
    + chalk.bold('--type') + '.\n';
    + 'Valid types are `single` and `double`.';
  console.log();
  console.log(msg);
}


var fp = path.join(process.cwd(), src);
if (!fs.existsSync(fp)) {
  console.log(chalk.red('  ' + fp + ' does not exist.'));
}
if (!change.hasOwnProperty(type)) {
  typeMsg();
}
var str = fs.readFileSync(fp, 'utf8');
str = change[type](str);
fs.writeFileSync(dest, str);
console.log();
console.log('  ' + symbol.success, 'Changed', chalk.bold(src), 'to have', type, 'quotes.');

