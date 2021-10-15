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
}

module.exports = Swot;
