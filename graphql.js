const graphql_http = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');
const imdb = require('./src/imdb');
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const uri = "mongodb+srv://Dani:voiture@empire-sample-i7cw5.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "empire-sample";
const DENZEL_IMDB_ID = 'nm0000243';
const port = 4000;

var app = Express();
var database;
var collection;

async function main(){

    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
                if(error) throw error;
                database = client.db(DATABASE_NAME);
                collection = database.collection("Movie");
        });
        
         /*Requête : {movies} -> 56*/
        const typeDefs = [`
          schema {
            query: Query
          }
          type Query {
            movies: Int               
            movie(id: String): Movie            
          }
          type Movie {
            id : String
            rating : Float
            vote : Float
            link: String
            metascore: Int
            synopsis: String
            title: String
            year: Int
          }
          
        `];

        const resolvers = {
          Query: {
            movies: async () => {
              var movies = await imdb(DENZEL_IMDB_ID);
              const res = await collection.insertMany(movies);
              return res.insertedCount;
            },
             movie: async (root, {id}) => {
              const res = await collection.findOne({ "id": id})
              return res;ss
          },

        },
      }
        const schema = makeExecutableSchema({
          typeDefs,
          resolvers
        })

        app.use('/graphql', graphql_http({
            schema: schema,
            graphiql: true,
        }));

        app.listen(port, () => {
            console.log("Connexion : OK ");
        });

    } catch (e) {
    console.log(e);
  }

}
main();

