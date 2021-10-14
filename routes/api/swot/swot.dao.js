var conn = require('../../../utils/dao');
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
    return await this.swotColl.find({}).toArray();
  }
}

module.exports = Swot;
