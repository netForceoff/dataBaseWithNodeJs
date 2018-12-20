let fs = require('fs');

let xmlBooks = fs.readFileSync('books.xml').toString();

let parserBooks = new DOMParser(),
    xmlDocBooks = parserBooks.parseFromString(xmlBooks, 'text/xml');

var XMLSerial = new XMLSerializer();
 
    addBookOnTable(xmlDocBooks, XMLSerial);

function addBookOnTable(xmlDocBooks, XMLSerial) {
    var numberShop = document.getElementById('numberShop');
    var select = document.getElementById('selection');
    var nameAuthor = document.getElementById('nameAuthor');
    var nameBook = document.getElementById('nameBook');
    var city = document.getElementById('city');

    var publishing = document.getElementById('publishing');
    var yearPublishing = document.getElementById('yearPublishing');
    var numberOfPages = document.getElementById('numberOfPages');
    var price = document.getElementById('price');

    var books = xmlDocBooks.getElementsByTagName('books')[0];

    var button = document.querySelector('button');

    button.addEventListener('click', function() {
        var book = xmlDocBooks.createElement('book');

        var numberShopXML = xmlDocBooks.createElement('numberShop');
        var sectionXML = xmlDocBooks.createElement('section');
        var autorXML = xmlDocBooks.createElement('autor');
        var nameBookXML = xmlDocBooks.createElement('nameBook');
        var cityXML = xmlDocBooks.createElement('country');
        var publishingXML = xmlDocBooks.createElement('publishing');
        var yearXML = xmlDocBooks.createElement('year');
        var numberOfPagesXML = xmlDocBooks.createElement('numberOfPages');
        var costXML = xmlDocBooks.createElement('cost');

        numberShopXML.textContent = numberShop.value;
        sectionXML.textContent = getOption(select);
        autorXML.textContent = nameAuthor.value;
        nameBookXML.textContent = nameBook.value;
        cityXML.textContent = city.value;
        publishingXML.textContent = publishing.value;
        yearXML.textContent = yearPublishing.value;
        numberOfPagesXML.textContent = numberOfPages.value;
        costXML.textContent = price.value;

        book.appendChild(numberShopXML);
        book.appendChild(sectionXML);
        book.appendChild(autorXML);
        book.appendChild(nameBookXML);
        book.appendChild(cityXML);
        book.appendChild(publishingXML);
        book.appendChild(yearXML);
        book.appendChild(numberOfPagesXML);
        book.appendChild(costXML);
        books.appendChild(book);
       
        var newXmlStr = XMLSerial.serializeToString(xmlDocBooks);
        
        fs.writeFile('books.xml', newXmlStr, err => {
          if (err) throw err;
        });

     });

}

function getOption(select) {
    var options = select.options;
    for (let elem of options) {
      if (elem.selected == true) {
        return elem.text;
      }
    }
  } 