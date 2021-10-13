var mongoClient = require('mongodb').MongoClient;
var dotenv = require('dotenv');

dotenv.config();

var {
  MONGO_USER,
  MONGO_PSWD,
  MONGO_HOST,
  MONGO_DB
} = process.env;

var connection = null;
var connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

var client = new mongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

if (!connection) {
client.connect()
  .then( (conn) => {
    console.log("Conectado a la DB");
    connection = conn;
  })
  .catch((err) => {
    console.log("Error al conectar a la db");
    process.exit(1);
  } );
}

module.exports = connection;
