const remote = require('electron').remote;
const main = remote.require('./main.js');
let fs = require('fs');

var xmlBooks = fs.readFileSync('books.xml').toString();
var xmlShops = fs.readFileSync('shops.xml').toString();

var parserBooks = new DOMParser(),
    xmlDocBooks = parserBooks.parseFromString(xmlBooks, 'text/xml');

var parserShops = new DOMParser(),
    xmlDocShops = parserShops.parseFromString(xmlShops, 'text/xml');

var XMLSerial = new XMLSerializer();

let addButtonBook = document.querySelector('#addButtonBook');
let addButtonShop = document.querySelector('#addButtonShop');

addWindowButton(main, addButtonBook, 'addBook', 450, 600);
addWindowButton(main, addButtonShop, 'addShop', 500, 500);

createTable(xmlDocBooks, xmlDocShops);
changeElementOnTable(xmlDocBooks);

function createTable(xmlDocBooks, xmlDocShops) {
  var table = document.querySelector('table');
  var nameBooks = xmlDocBooks.getElementsByTagName('book');

  for (var i = 0; i < nameBooks.length; i++) {
    var numberBook = xmlDocBooks.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue;
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + xmlDocBooks.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocShops.getElementsByTagName('nameShop')[Number(numberBook)-1].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('section')[i].childNodes[0].nodeValue + '</td>' +
    '<td>' + xmlDocBooks.getElementsByTagName('autor')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('nameBook')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('country')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('publishing')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('year')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('numberOfPages')[i].childNodes[0].nodeValue + '</td>'+
    '<td>' + xmlDocBooks.getElementsByTagName('cost')[i].childNodes[0].nodeValue + '</td>';
    deleteTr(table, tr, i, xmlDocBooks);
    table.appendChild(tr);
  }
}

function changeElementOnTable( xmlDocBooks) {
  var td = document.querySelectorAll('td');
  
  for (let elem of td) {
    elem.addEventListener('dblclick',add);
  }
  
  function add() {
    var text = this.innerHTML;
    this.innerHTML = '';

    var input = document.createElement('input');
    input.value = text;
    this.appendChild(input);

    var self = this;
    input.addEventListener('blur',function() {
    self.innerHTML = this.value;
    changeXMLFile(xmlDocBooks);
    self.addEventListener('dblclick',add);
    });
    this.removeEventListener('dblclick',add);
}

function changeXMLFile(xmlDocBooks) {
  var nameBooks = xmlDocBooks.getElementsByTagName('book');
  var td = document.querySelectorAll('td');
  var i = 0; 

  for (var j = 0; j < nameBooks.length; j++) {
    xmlDocBooks.getElementsByTagName('numberShop')[j].childNodes[0].textContent = td[i].innerHTML;
    xmlDocBooks.getElementsByTagName('section')[j].childNodes[0].textContent = td[i+2].innerHTML;
    xmlDocBooks.getElementsByTagName('autor')[j].childNodes[0].textContent = td[i+3].innerHTML;
    xmlDocBooks.getElementsByTagName('nameBook')[j].childNodes[0].textContent = td[i+4].innerHTML;
    xmlDocBooks.getElementsByTagName('country')[j].childNodes[0].textContent = td[i+5].innerHTML;
    xmlDocBooks.getElementsByTagName('publishing')[j].childNodes[0].textContent = td[i+6].innerHTML;
    xmlDocBooks.getElementsByTagName('year')[j].childNodes[0].textContent = td[i+7].innerHTML;
    xmlDocBooks.getElementsByTagName('numberOfPages')[j].childNodes[0].textContent = td[i+8].innerHTML;
    xmlDocBooks.getElementsByTagName('cost')[j].childNodes[0].textContent = td[i+9].innerHTML;
    i = i+11;
  }
  saveXMLFile(XMLSerial);
  }
}

function deleteTr(table, tr, i, xmlDocBooks) {
  var nameBooks = xmlDocBooks.getElementsByTagName('book')[i];
  var td = document.createElement('td');
  tr.appendChild(td);

  var del = document.createElement('button');
  del.innerHTML = "Удалить";
  del.classList.add('delete');
  
  td.appendChild(del);

  del.addEventListener('click', function() {
    table.removeChild(tr);
    xmlDocBooks.childNodes[0].removeChild(nameBooks);
    saveXMLFile(XMLSerial);
  });
}

function getSearchOnTable() {
  var inputSearch = document.querySelector('.search');
  var table = document.querySelector('table');

  var regPhrase = new RegExp(inputSearch.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }

    }
}

function addWindowButton(main, button, filename, x, y) {
  button.addEventListener('click', () => {
    main.openWindow(filename, x, y);
  }, false);
}

function saveXMLFile(XMLSerial) {
  var newXmlStr = XMLSerial.serializeToString(xmlDocBooks);
        
  fs.writeFile('books.xml', newXmlStr, err => {
    if (err) throw err;
  });
}
