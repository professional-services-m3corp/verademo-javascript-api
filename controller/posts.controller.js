const postsService = require("../services/posts.service");

exports.getAllBlabs = (req, res, next) => {
  console.log('GET /posts/getAllBlabs')
  console.log('Request Data: '+JSON.stringify(req.body))
  const data = {};
  postsService.getAllBlabs(data, (error, results) => {
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

exports.getBlabsForMe = (req, res, next) => {
  console.log('GET /posts/getBlabsForMe')
  console.log('Request Data: '+JSON.stringify(req.body))
  postsService.getBlabsForMe(req.user, (error, results) => {
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

exports.getBlabsByMe = (req, res, next) => {
  console.log('GET /posts/getBlabsByMe')
  console.log('Request Data: '+JSON.stringify(req.body))
  postsService.getBlabsByMe(req.user, (error, results) => {
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


exports.getBlabComments = (req, res, next) => {
  console.log('POST /posts/getBlabComments')
  console.log('Request Data: '+JSON.stringify(req.body))

  //check required parameters
  if ( typeof req.body.blabId == 'undefined' ){
    return res.status(400).send({
      success: 1,
      data: "One or more required parameters missing",
    });
  }
  const data = {
    blabId: req.body.blabId,
  };
  postsService.getBlabComments(data, (error, results) => {
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


exports.addBlab = (req, res, next) => {
  console.log('POST /posts/addBlab')
  console.log('Request Data: '+JSON.stringify(req.body))

  //check required parameters
  if ( typeof req.body.blab == 'undefined' ){
    return res.status(400).send({
      success: 1,
      data: "One or more required parameters missing",
    });
  }

  const data = {
    user: req.user,
    blab: req.body.blab,
  };

  postsService.addBlab(data, (error, results) => {
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


exports.addBlabComment = (req, res, next) => {
  console.log('POST /posts/addBlabComment')
  console.log('Request Data: '+JSON.stringify(req.body))

  //check required parameters
  if ( typeof req.body.blabId == 'undefined' || typeof req.body.comment == 'undefined' ){
    return res.status(400).send({
      success: 1,
      data: "One or more required parameters missing",
    });
  }

  const data = {
    user: req.user,
    blabId: req.body.blabId,
    comment: req.body.comment,
  };
  postsService.addBlabComment(data, (error, results) => {
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

  
exports.deleteBlab = (req, res, next) => {
  console.log('DELETE /posts/deleteBlab')
  console.log('Request Data: '+JSON.stringify(req.body))
  console.log('User: '+req.user)
  //check user
  if ( req.user != 'admin'){
    console.log('Not admin user, request forbidden')
    return res.status(403).send({ success: 0, data: "Forbidden" });
  }

  //check required parameters
  if ( typeof req.body.blabId == 'undefined' ){
    return res.status(400).send({
      success: 1,
      data: "One or more required parameters missing",
    });
  }

  const data = {
    blabId: req.body.blabId,
  };
  postsService.deleteBlab(data, (error, results) => {
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