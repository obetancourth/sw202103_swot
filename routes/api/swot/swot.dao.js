var conn = require('../../../utils/dao');
var ObjectID = require('mongodb').ObjectId;
var _db;
class Swot{
  swotColl =null;
  constructor(){
    this.initModel();
  }
  async initModel(){
     try {
      _db = await conn.getDB();
       this.swotColl = await _db.collection("SWOT");
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
  }
  async getAll(){
    let swots = await this.swotColl.find({});
    return swots.toArray();
  }

  async getById(id){
    const filter = { "_id": new ObjectID(id)};
    let swotDocument = await this.swotColl.findOne(filter);
    return swotDocument;
  }

  async getByType(type){
    // SELECT * from SWOT where swotType = ?;
    const filter = {"swotType": type};
    let cursor = await this.swotColl.find(filter);
    return cursor.toArray();
  }

  async getByMetaKey(key){
    const filter = {"swotMeta":key};
    let cursor = await this.swotColl.find(filter);
    return cursor.toArray();
  }

  /*
    SWOT, SWOTMETA   {swotid 1:n}
    SELECT * from SWOT INNER JOIN SWOTMETA on SWOT.swotid = SWOTMETA.swotid
    where SWOTMETA.swotKey = ?;
  */
 

  async addNew(swotType, swotDesc, swotMetaArray){
    let newSwot = {
      swotType,
      swotDesc,
      swotMeta: swotMetaArray,
      swotDate: new Date().getTime()
    }
    let result = await this.swotColl.insertOne(newSwot);
    return result;
  }
  async addMetaToSwot(swotMetaKey, id) {
    // UPDATE SWOT set swotMeta = 'Nuevo Valor' where _id = 'aId';
    let filter = {"_id": new ObjectID(id)};
    let updateJson = {
      "$push" : {"swotMeta": swotMetaKey}
    };
    let result = await this.swotColl.updateOne(filter, updateJson);
    return result;
  }

  async deleteById(id) {
    // DELETE FROM SWOT where _id = 'aId';
    let filter = { "_id": new ObjectID(id) };
    let result = await this.swotColl.deleteOne(filter);
    return result;
  }


}

module.exports = Swot;
