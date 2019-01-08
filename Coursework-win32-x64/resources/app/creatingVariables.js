const remote = require('electron').remote;
const main = remote.require('./main.js');
let fs = require('fs');

let xmlBooks = fs.readFileSync('books.xml').toString();
let xmlShops = fs.readFileSync('shops.xml').toString();

let parserBooks = new DOMParser(),
    xmlDocBooks = parserBooks.parseFromString(xmlBooks, 'text/xml');

let parserShops = new DOMParser(),
    xmlDocShops = parserShops.parseFromString(xmlShops, 'text/xml');

let XMLSerial = new XMLSerializer();
