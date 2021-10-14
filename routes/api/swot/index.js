var express = require('express');
var router = express.Router();
var SwotDao = require('./swot.dao');
var Swot = new SwotDao();

router.get('/all', async (req, res, next)=>{
  try{
    const allSwotEntries = await Swot.getAll();
    return res.status(200).json(allSwotEntries);
  }catch(ex){
    console.log(ex);
    return res.status(500).json({msg:"Error al procesar petición"});
  }
});

/*
// Uso tradicional con inyeccion de handlers | funciones
router.get('/all', (req, res, next) => {
    Swot.getAll((err, allSwotEntries)=>{
      if(err){
        return res.status(500).json({ msg: "Error al procesar petición" });
      }
      return res.status(200).json(allSwotEntries);
    });
});
*/
// SWOT = FODA = Strength, Weakness, Oportunity, Threats
// Fortalezas, Oportunidades, Debilidades, Amenazas

module.exports = router;
