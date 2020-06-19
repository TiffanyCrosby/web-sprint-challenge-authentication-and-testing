/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

module.exports = (req, res, next) => {
 try{
   const token = req.headers.authorization;
   
   if(token){
     jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
       if(err){
         res.status(401).json(`Shame on you! Stop trying to break in!`)
       } else {
         req.decodedJwt = decodedToken;
         console.log(req.decodedJwt);
         next();
       }
     })
   }
 } catch(err){
   next(err);
 }
};
