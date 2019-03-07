const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://Dani:Skydan17041704@empire-sample-i7cw5.mongodb.net/test?retryWrites=true";
//const CONNECTION_URL = "mongodb://Dani:Skydan17041704@empire-sample-shard-00-00-i7cw5.mongodb.net:27017,empire-sample-shard-00-01-i7cw5.mongodb.net:27017,empire-sample-shard-00-02-i7cw5.mongodb.net:27017/test?ssl=true&replicaSet=empire-sample-shard-0&authSource=admin&retryWrites=true"
const DATABASE_NAME = "example";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});