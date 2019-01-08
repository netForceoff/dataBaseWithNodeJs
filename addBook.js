addBookOnTable(xmlDocBooks, XMLSerial);

function addBookOnTable(xmlDocBooks, XMLSerial) {
  let form = document.querySelector('form');
  let elems = form.elements;
  let books = xmlDocBooks.getElementsByTagName('books')[0];
  let shops = xmlDocShops.getElementsByTagName('shop');
  let flag = false;

  let button = document.querySelector('button');

  button.addEventListener('click', function() {
    let book = xmlDocBooks.createElement('book');
    

    let numberShopXML = xmlDocBooks.createElement('numberShop');
    let sectionXML = xmlDocBooks.createElement('section');
    let autorXML = xmlDocBooks.createElement('autor');
    let nameBookXML = xmlDocBooks.createElement('nameBook');
    let cityXML = xmlDocBooks.createElement('country');
    let publishingXML = xmlDocBooks.createElement('publishing');
    let yearXML = xmlDocBooks.createElement('year');
    let numberOfPagesXML = xmlDocBooks.createElement('numberOfPages');
    let costXML = xmlDocBooks.createElement('cost');

    resetError(elems.id.parentNode);

    for (let i = 0; i < shops.length; i++) {
      if (elems.id.value == xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue) {
        numberShopXML.textContent = elems.id.value;
        flag = true;
        break;
      } else if ((i == shops.length - 1 && flag == false) || !(/^\d+$/g.test(elems.id.value))) {
        showErorr(elems.id.parentNode, 'Такого id не существует!');
        break;
      } else {
        flag = false;
      }
    }

    resetError(elems.section.parentNode);

    if(!elems.section.value) {
      showErorr(elems.section.parentNode, 'Укажите раздел');
    } else {
      sectionXML.textContent = getOption(elems.section);
    }

    resetError(elems.author.parentNode);

    if (elems.author.value == '') {
      showErorr(elems.author.parentNode, 'Укажите автора');
    } else {
      autorXML.textContent = elems.author.value;
    }

    resetError(elems.bookName.parentNode);

    if (elems.bookName.value == '') {
      showErorr(elems.bookName.parentNode, 'Укажите название книги');
    } else {
      nameBookXML.textContent = elems.bookName.value;
    }
      
    resetError(elems.country.parentNode);

    if (elems.country.value == '') {
      showErorr(elems.country.parentNode, 'Укажите город');
    } else {
      cityXML.textContent = elems.country.value;
    }
      
    resetError(elems.publishing.parentNode);

    if (elems.publishing.value == '') {
      showErorr(elems.publishing.parentNode, 'Укажите издательство');
    } else {
      publishingXML.textContent = elems.publishing.value;
    }

    resetError(elems.yearPublishing.parentNode);

    if (!/^\d+$/g.test(elems.yearPublishing.value) || elems.yearPublishing.value == '') {
      showErorr(elems.yearPublishing.parentNode, 'Укажите год правильно');
    } else {
       yearXML.textContent = elems.yearPublishing.value;
    }

    resetError(elems.numberOfPages.parentNode);

    if (!/^\d+$/g.test(elems.numberOfPages.value) || elems.numberOfPages.value == '') {
      showErorr(elems.numberOfPages.parentNode, 'Укажите номера правильно');
    } else {
      numberOfPagesXML.textContent = elems.numberOfPages.value;
    }

    resetError(elems.price.parentNode);

    if (!/^\d+$/g.test(elems.price.value) || elems.price.value == '') {
      showErorr(elems.price.parentNode, 'Укажите цену правильно');
    } else {
      costXML.textContent = elems.price.value;
    }

    if ((elems.id.value != '' && flag == true) && elems.section.value != '' && elems.author.value != '' && 
      elems.bookName.value != '' && elems.country.value != '' && elems.publishing.value != '' &&
      elems.yearPublishing.value != '' && elems.numberOfPages.value != '' && elems.price.value != '') {
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
      let newXmlStr = XMLSerial.serializeToString(xmlDocBooks);
        
      fs.writeFile('books.xml', newXmlStr, err => {
        if (err) throw err;
      });
    }
  });
}

function getOption(select) {
  let options = select.options;
  for (let elem of options) {
    if (elem.selected == true) {
      return elem.text;
    }
  }
} 