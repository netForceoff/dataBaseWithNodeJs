let fileName = 'shops.xml';
let openingButton = document.getElementById('add');

addWindowButton(main, openingButton, 'addShop', 620, 200);

createTable(xmlDocShops, xmlDocBooks);
changeElementOnTable(xmlDocShops);


function createTable(xmlDocShops) {
    let table = document.querySelector('table');
    let shops = xmlDocShops.getElementsByTagName('shop');

    structureIdShops(xmlDocShops); 
      
    for (let i = 0; i < shops.length; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue + '</td>'+
        '<td>' + xmlDocShops.getElementsByTagName('nameShop')[i].childNodes[0].nodeValue + '</td>'+
        '<td>' + xmlDocShops.getElementsByTagName('shopAddress')[i].childNodes[0].nodeValue + '</td>';
        deleteTr(table, tr, i, xmlDocShops, xmlDocBooks);
        table.appendChild(tr);
        }   
}
     
function deleteTr(table, tr, i, xmlDocShops, xmlDocBooks) {
    let shops = xmlDocShops.getElementsByTagName('shop')[i];
    let numberShopsOfBooks = xmlDocBooks.getElementsByTagName('book');
    let flag = false;

    let td = document.createElement('td');
    tr.appendChild(td);
      
    let del = document.createElement('button');
    del.innerHTML = "Удалить";
    del.classList.add('delete');
        
    td.appendChild(del);


    del.addEventListener('click', function() {
    for (let j = 0; j < numberShopsOfBooks.length; j++) {
        if (xmlDocBooks.getElementsByTagName('numberShop')[j].childNodes[0].nodeValue == xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue) {
            alert('Существуют связи, удаление невозможно!');
            flag = true;
            break;
        } else if (j == numberShopsOfBooks.length - 1 && flag == false) {
                table.removeChild(tr);
                xmlDocShops.childNodes[0].removeChild(shops);
                saveXMLFile(XMLSerial, xmlDocShops);
            }
        }
    });    
} 

function changeElementOnTable(xmlDocShops) {
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
        changeXMLFile(xmlDocShops);
        self.addEventListener('dblclick',add);
      });

      this.removeEventListener('dblclick',add);
    }
}

function changeXMLFile(xmlDocShops) {
    var nameShops = xmlDocShops.getElementsByTagName('shop');
    var td = document.querySelectorAll('td');
    var i = 0; 

    for (var j = 0; j < nameShops.length; j++) {
        xmlDocShops.getElementsByTagName('numberShop')[j].childNodes[0].textContent = td[i].innerHTML;
        xmlDocShops.getElementsByTagName('nameShop')[j].childNodes[0].textContent = td[i+1].innerHTML;
        xmlDocShops.getElementsByTagName('shopAddress')[j].childNodes[0].textContent = td[i+2].innerHTML;
        i = i+4;
    } 
    saveXMLFile(XMLSerial, xmlDocShops);
}


function structureIdShops(xmlDocShops) {
    let shops = xmlDocShops.getElementsByTagName('shop');
    for (let i = 0; i < shops.length - 1; i++) {
        if ((parseInt(xmlDocShops.getElementsByTagName('numberShop')[i + 1].childNodes[0].nodeValue) - parseInt(xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue)) != 1) {
            xmlDocShops.getElementsByTagName('numberShop')[i + 1].childNodes[0].textContent = parseInt(xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue) + 1;
        }
        
    }
    //changeXMLFile(xmlDocShops);
}