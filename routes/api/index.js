var express = require('express');
var router = express.Router();


const passport = require('passport');
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next) => {
      // tienen la oportunidad de validaciones extras
      return next(null, payload);
    }
  )
);



const jwtMiddleware = passport.authenticate('jwt', {session:false});

router.use(passport.initialize());

var swotRouter = require('./swot/index');
var secRouter = require('./sec/index');

router.get('/', (req, res, next)=>{
    res.status(200).json({"msg":"Api V1 JSON"});
  }
);

router.use('/sec', secRouter);
router.use('/swot', jwtMiddleware ,swotRouter);

/*
router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

router.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

router.get("/add/:int1/:int2", (req, res, next) => {
  const { int1, int2 } = req.params;
  const result = parseInt(int1) + parseInt(int2);
  return res.status(200).json(
    { int1: parseInt(int1), int2: parseInt(int2), resultado: result }
  );
});

router.post("/new", (req, res, next) => {
  const { email, pswd, secret } = req.body;
  // vamos a agregarlos a alguna persistencia -- DynamoDB  --MongoDb Atlas
  return res.status(200).json(
    {
      "email": email,
      "password": pswd,
      "secret": secret,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

router.put("/update/:id", (req, res, next) => {
  const { id } = req.params;
  const { email, pswd, secret } = req.body;

  // actualizar el recursos de la persistencia
  return res.status(200).json(
    {
      "id": id,
      "email": email,
      "password": pswd,
      "secret": secret,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;
  // en la persistencia se debe borrar el recurso identificado
  return res.status(200).json(
    {
      "id": id,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

router.post("/conjunto", (req, res, next) => {
  const rangostr = req.body.rango;
  let arrTuplas = rangostr.replace(/[\[\]]/g, "").split(";");
  //eliminar los corechetes
  //separar por ,
  // generar el conjunto unico
  // devolver el json
  return res.status(200).json({ rango: arrTuplas });
});

*/
module.exports = router;
