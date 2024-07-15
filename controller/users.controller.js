const usersService = require("../services/users.service");


exports.getUsers = (req, res, next) => {
  console.log('GET /users/getUsers')
  console.log('Request Data: '+JSON.stringify(req.body))
  usersService.getUsers((error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).send({
      success: 1,
      data: results,
    });
  });
};

exports.ignore = (req, res, next) => {
  console.log('GET /users/ignore')
  console.log('Request Data: '+JSON.stringify(req.body))
  blabberUser = req.query.blabberUsername;
  usersService.ignore(blabberUser, req.user, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).send({
      success: 1,
      data: results,
    });
  });
};

exports.getBlabbers = (req, res, next) => {
  console.log('GET /users/getBlabbers')
  console.log('Request Data: '+JSON.stringify(req.body))
  sort = req.query.sort
  usersService.getBlabbers(req.user, sort, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).send({
      success: 1,
      data: results,
    });
  });
};


exports.userLogin = (req, res, next) => {
  console.log('POST /users/login')
  console.log('Request Data: '+JSON.stringify(req.body))
  //check user
  if ( req.user != req.body.username){
    console.log('Requesting password for a different user, request forbidden')
    return res.status(403).send({ success: 0, data: "Forbidden" });
  }
  //check required parameters
  if ( typeof req.body.username == 'undefined' || typeof req.body.password == 'undefined' ){
    return res.status(400).send({
      success: 1,
      data: "One or more required parameters missing",
    });
  }

  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  usersService.userLogin(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).send({
      success: 1,
      data: results,
    });
  });
};