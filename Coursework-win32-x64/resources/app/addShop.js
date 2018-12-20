let fs = require('fs');
let xmlShops = fs.readFileSync('shops.xml').toString();

let parserShops = new DOMParser(),
    xmlDocShops = parserShops.parseFromString(xmlShops, 'text/xml');
    console.log(xmlDocShops);

var XMLSerial = new XMLSerializer();

addShopOnTable(xmlDocShops, XMLSerial);

function addShopOnTable(xmlDocShops, XMLSerial) {
    var idNumber = document.getElementById('idNumber');
    var nameShop = document.getElementById('nameShop');
    var shopAddress = document.getElementById('shopAddress');

    var shops = xmlDocShops.getElementsByTagName('shops')[0];

    var button = document.querySelector('button');

    button.addEventListener('click', function() {
        var shop = xmlDocShops.createElement('shop');
        var numberShopXML = xmlDocShops.createElement('numberShop');
        var nameShopXML = xmlDocShops.createElement('nameShop');
        var shopAddressXML = xmlDocShops.createElement('shopAddress');

        numberShopXML.textContent = idNumber.value;
        nameShopXML.textContent = nameShop.value;
        shopAddressXML.textContent = shopAddress.value;

        shop.appendChild(numberShopXML);
        shop.appendChild(nameShopXML);
        shop.appendChild(shopAddressXML);
        shops.appendChild(shop);

        var newXmlStr = XMLSerial.serializeToString(xmlDocShops);

        fs.writeFile('shops.xml', newXmlStr, err => {
          if (err) throw err;
        });

    });
}