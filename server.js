let express = require('express');
let bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let app = express();
const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

const client = new mongoClient(url);




app.use(bodyParser.json()); // Чтобы парсить првильно json в body
app.use(bodyParser.urlencoded({ extended: true })); // Правильно парсить данные формы

var shops = [
    {
        id: 1,
        name: 'Глория'
    },
    {
        id: 2,
        name: 'Книжный'
    },
    {
        id: 3,
        name: 'Буратино'
    }
];

function createDb(db, callback) {

    app.get('/', function (res) {
    res.send('Hello API');
    });

    app.get('/shops', function (res) {
        db.collection('shops').find().toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(res, docs.length);
            
        });
    });

    app.get('/shops/:id', function (req, res) {
    var shopId = shops.find(function (shop) {
        return shop.id == Number(req.params.id);
    })
    res.send(shopId);
    });

    app.post('/shops', function (req, res) {
        var shop = {
            name: req.body.name
        };
    
        db.collection('shops').insert(shop, function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.send(shop);
            callback();
        });
    });



app.put('/shops/:id', function (req, res) {
    var shopId = shops.find(function (shop) {
        return shop.id == Number(req.params.id);
    });
    shopId.name = req.body.name;
    res.sendStatus(200); // Проверка на получение сервером данных, если получил то ОК
});

app.delete('/shops/:id', function (req, res) {
    shops = shops.filter(function (shop) {
        return shop.id != Number(req.params.id);
    });
    res.sendStatus(200);
});
}

client.connect(function(err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    app.listen(3012, function() {
        console.log('API app started');
        
    });
    let db = client.db(dbName);

    createDb(db, function() {
        client.close();
    });

   
});



