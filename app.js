const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var cors = require('cors');
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

const CONNECTION_URL = "mongodb+srv://Dani:voiture@empire-sample-i7cw5.mongodb.net/test?retryWrites=true";
//const CONNECTION_URL = "mongodb://Dani:voiture@empire-sample-shard-00-00-i7cw5.mongodb.net:27017,empire-sample-shard-00-01-i7cw5.mongodb.net:27017,empire-sample-shard-00-02-i7cw5.mongodb.net:27017/test?ssl=true&replicaSet=empire-sample-shard-0&authSource=admin&retryWrites=true"
const DATABASE_NAME = "empire-sample";


//dvUv9xun_TH9ZBh

var myMovies;

async function sb() {
    myMovies = await imdb(DENZEL_IMDB_ID);


    var app = Express();
    app.use(cors());

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));

    var database, collection;

    app.listen(3002, () => {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if (error) {
                throw error;
            }
            database = client.db(DATABASE_NAME);
            collection = database.collection("Movie");

            console.log("Connected to `" + DATABASE_NAME + "`!");
            //collection.insert(myMovies);
        });
    });

    app.get("/movie", (request, response) => {
        collection.find({}).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        })
    })

    app.get("/movie/populate", (request, response) => {
        collection.find({}).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        })
    })

    /*app.post("/person", (request, response) => {
        collection.insert(request.body, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result.result);
        });
    });*/

    /*curl -X POST \
        -H 'content-type:application/json' \
        -d '{"firstname":"Maria","lastname":"Raboy"}' \
        http://localhost:3000/person*/

    /*app.get("/people", (request, response) => {
        collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });*/

    /*curl -X GET http://localhost:3000/people*/

    app.get("/movie/:id", (request, response) => {
        collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });

    /*curl -X GET http://localhost:3000/person/5b103f48213e84103d52cfd5*/
}
sb();