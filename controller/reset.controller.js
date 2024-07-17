const resetService = require("../services/reset.service");

exports.reset = (req, res, next) => {
    console.log('GET /users/reset')
    console.log('Request Data: '+JSON.stringify(req.body))
    resetService.reset((error, results) => {
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