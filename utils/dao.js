var mongoClient = require('mongodb').MongoClient;


var {
  MONGO_USER,
  MONGO_PSWD,
  MONGO_HOST,
  MONGO_DB
} = process.env;

var _db = null;
var connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

var client = new mongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });



module.exports = class {
  static async getDB(){
    if (!_db) {
      try {
        var conn = await client.connect()
        console.log("Conectado a la DB");
        _db = conn.db(MONGO_DB);
      } catch(err) {
          console.log("Error al conectar a la db", err);
          process.exit(1);
      }
    }
    return _db;
  }
}
