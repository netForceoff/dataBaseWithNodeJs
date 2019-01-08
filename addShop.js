addShopOnTable(xmlDocShops, XMLSerial);

function addShopOnTable(xmlDocShops, XMLSerial) {
  let shops = xmlDocShops.getElementsByTagName('shops')[0];
  let button = document.querySelector('button');
  let form = document.querySelector('form');
  let elems = form.elements;
  let flag = false;

  button.addEventListener('click', function() {
    let shop = xmlDocShops.createElement('shop');
    let numberShopXML = xmlDocShops.createElement('numberShop');
    let nameShopXML = xmlDocShops.createElement('nameShop');
    let shopAddressXML = xmlDocShops.createElement('shopAddress');
    let shopTag = xmlDocShops.getElementsByTagName('shop');

    resetError(elems.id.parentNode);

    if (!(/^\d+$/g.test(elems.id.value))) {
      showErorr(elems.id.parentNode, 'Введите корректный id');
    } else {
      numberShopXML.textContent = elems.id.value;
    }

    resetError(elems.shopName.parentNode);

    if (elems.shopName.value == '') {
      showErorr(elems.shopName.parentNode, 'Введите название');
    } else {
      nameShopXML.textContent = elems.shopName.value;
    }

    resetError(elems.shopAddress.parentNode);

    if (elems.shopAddress.value == '') {
      showErorr(elems.shopAddress.parentNode, 'Введите адрес');
    } else {
      shopAddressXML.textContent = elems.shopAddress.value;
    }

    if (elems.id.value != '' && elems.shopName.value != '' && elems.shopAddress.value != '') {
      for (var i = 0; i < shopTag.length; i++) {
        if (xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue == elems.id.value) {
          resetError(elems.id.parentNode);
          showErorr(elems.id.parentNode, 'Магазин с таким номером существует');
          flag = true;
            break;
        } else if (i == shopTag.length - 1 && flag == false) {
            let count = parseInt(elems.id.value) - parseInt(xmlDocShops.getElementsByTagName('numberShop')[i].childNodes[0].nodeValue);
            if (count != 1) {
              numberShopXML.textContent = parseInt(xmlDocShops.getElementsByTagName('numberShop')[i-1].childNodes[0].nodeValue) + 1;
            }
            shop.appendChild(numberShopXML);
            shop.appendChild(nameShopXML);
            shop.appendChild(shopAddressXML);
            shops.appendChild(shop); 
          
            let newXmlStr = XMLSerial.serializeToString(xmlDocShops);
            fs.writeFile('shops.xml', newXmlStr, err => {
              if (err) throw err;
            });
          } 
        }
      flag = false; 
    }
  });
}