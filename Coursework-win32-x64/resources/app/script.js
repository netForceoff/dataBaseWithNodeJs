let buttonAddingBook = document.querySelector('#addButtonBook');
let buttonAddingShop = document.querySelector('#addButtonShop');
let buttonViewShop = document.querySelector('#buttonForWatchingShop');
let fileName = 'books.xml';

addWindowButton(main, buttonAddingBook, 'addBook', 600, 350);
addWindowButton(main, buttonAddingShop, 'addShop', 620, 200);
addWindowButton(main, buttonViewShop, 'viewShop', 1000, 600);

createTable(xmlDocBooks, xmlDocShops);
changeElementOnTable(xmlDocBooks);

function createTable(xmlDocBooks, xmlDocShops) {
  let table = document.querySelector('table');
  let nameBooks = xmlDocBooks.getElementsByTagName('book');

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

function changeElementOnTable(xmlDocBooks) {
  let td = document.querySelectorAll('td');
  
  for (let elem of td) {
    elem.addEventListener('dblclick',add);
  }
  
  function add() {
    let text = this.innerHTML;
    this.innerHTML = '';

    let input = document.createElement('input');
    input.value = text;
    this.appendChild(input);

    let self = this;
    input.addEventListener('blur',function() {
    self.innerHTML = this.value;
    changeXMLFile(xmlDocBooks);
    self.addEventListener('dblclick',add);
    });
    this.removeEventListener('dblclick',add);
}

function changeXMLFile(xmlDocBooks) {
  let nameBooks = xmlDocBooks.getElementsByTagName('book');
  let td = document.querySelectorAll('td');
  let i = 0; 

  for (let j = 0; j < nameBooks.length; j++) {
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
  saveXMLFile(XMLSerial, xmlDocBooks);
  }
}

function deleteTr(table, tr, i, xmlDocBooks) {
  let nameBooks = xmlDocBooks.getElementsByTagName('book')[i];
  let td = document.createElement('td');
  tr.appendChild(td);

  let del = document.createElement('button');
  del.innerHTML = "Удалить";
  del.classList.add('delete');
  
  td.appendChild(del);

  del.addEventListener('click', function() {
    table.removeChild(tr);
    xmlDocBooks.childNodes[0].removeChild(nameBooks);
    saveXMLFile(XMLSerial, xmlDocBooks);
  });
}


