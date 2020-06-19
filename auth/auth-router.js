const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../secrets/secrets');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model')

router.post('/register', (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
  .then(newUser => {
    const token = genToken(newUser);
    res.status(201).json({created_user: newUser, token: token})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(`Whoops, something went wrong! ${error}`)
  })
});

router.post('/login', (req, res, next) => {
  let {username, password} = req.body;

  Users.findBy({username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = genToken(user);
      res.status(200).json({username: user.username, token: token})
    } else {
      res.status(401).json(`Uhhh...wrong info. You are being deleted...jk!`)
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(`Whoops, something went wrong! ${error}`)
  });
});

function genToken(user){
  const payload = {
    userid: user.id,
    username: user.username,
  };
  const options = {expiresIn: '3h'};
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}


module.exports = router;
