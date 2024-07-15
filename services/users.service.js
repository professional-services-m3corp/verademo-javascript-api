const db = require("../config/db.config");
const crypto = require('crypto');
const moment = require('moment')
const speakeasy = require('speakeasy')
const { error } = require("console");
const { isJSDocNonNullableType } = require("typescript");

exports.getUsers = (callback) => {
  db.query(
    `SELECT username,real_name,blab_name,created_at from users`,
    //[],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
exports.ignore = (blabberUsername, username, callback) => {
  try{
  let sqlQuery = "DELETE FROM listeners WHERE blabber=? AND listener=?;";
  console.log(sqlQuery);
  db.query(sqlQuery, [blabberUsername, username], (error, results) => {
    if (error) {
      throw error
    }
    sqlQuery = "SELECT blab_name FROM users WHERE username = '" + blabberUsername + "'";
    console.log(sqlQuery);
    db.query(sqlQuery, (error, results) => {
      if (results.length > 0 )        
      {
        console.log('result found');
        /* START EXAMPLE VULNERABILITY */
        let event = username + " is now ignoring " + blabberUsername + " (" + results[0].blab_name + ")";
        sqlQuery = "INSERT INTO users_history (blabber, event) VALUES (\"" + username + "\", \"" + event + "\")";
        console.log(sqlQuery);
        db.query(sqlQuery, (error, results) => {
          if (error)
          {
            throw error;
          }
          });
        /* END EXAMPLE VULNERABILITY */
      }
      else{
        throw error
      }
    });
    return callback(null, results);
  });
  }
catch (err) {
  console.error(err);
  return callback(err);
}
};

exports.listen = (blabberUsername, username, callback) => {
  try{
    let sqlQuery = "INSERT INTO listeners (blabber, listener, status) values (?, ?, 'Active');";
    console.log(sqlQuery);
    db.query(sqlQuery, [blabberUsername, username], (error, results) => {
      if (error) {
        throw error
      }
      sqlQuery = "SELECT blab_name FROM users WHERE username = '" + blabberUsername + "'";
      console.log(sqlQuery);
      db.query(sqlQuery, (error, results) => {
        if (results.length > 0 )        
        {
          console.log('result found');
          /* START EXAMPLE VULNERABILITY */
          let event = username + " started listening to " + blabberUsername + " (" + results[0].blab_name + ")";
          sqlQuery = "INSERT INTO users_history (blabber, event) VALUES (\"" + username + "\", \"" + event + "\")";
          console.log(sqlQuery);
          db.query(sqlQuery, (error, results) => {
            if (error)
            {
              throw error;
            }
            });
          /* END EXAMPLE VULNERABILITY */
        }
        else{
          throw error
        }
      });
      return callback(null, results);
    });
  }
  catch (err) {
    console.error(err);
    return callback(err);
  }
};

exports.getBlabbers = (username, sort, callback) => {
  if (sort == null || sort.isEmpty()) {
    sort = "blab_name ASC";
}
  const blabbersSql = "SELECT users.username," + " users.blab_name," + " users.created_at,"
            + " SUM(if(listeners.listener=?, 1, 0)) as listeners,"
            + " SUM(if(listeners.status='Active',1,0)) as listening"
            + " FROM users LEFT JOIN listeners ON users.username = listeners.blabber"
            + " WHERE users.username NOT IN (\"admin\",\"admin-totp\",?)" + " GROUP BY users.username" + " ORDER BY " + sort + ";";

  db.query(blabbersSql, [username, username],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

exports.userLogin = (data, callback) => {
  let hashedPassword = crypto.createHash('md5').update(data.password).digest('hex')
  console.log('hashed pass: '+hashedPassword)
  db.query(
    //bad code - SQLi
    `SELECT password from users where username='`+data.username+`' and password='`+hashedPassword+`'`,

    //good code
    //`SELECT * from users where username = ? and password = ?,
    //[data.username, hashedPassword],
    (error, results, fields) => {
      if (error) {
        console.log('Error: '+error)
        return callback(error);
      }
      const resultsLength = results.length
      if ( resultsLength >= 1 ){
        const userToken = results[0].password
        console.log('Auth Token: '+userToken)
        return callback(null, [{"auth token":""+userToken+""}]);
      }
      else {
        return callback(null, "User could not be found");
      }
    }
  );
};

exports.register = async (data, callback) => {
  const username = data.username
	const password = data.password
	const cpassword = data.cpassword
	const realName = data.realName
	const blabName = data.blabName
	
  //
	if (password !== cpassword) {
		console.log("Password and Confirm Password do not match");
		return callback(null, 'password error')
	}

	try {
		// /* START EXAMPLE VULNERABILITY */
		// // Execute the query
		mysqlCurrentDateTime = moment().format("YYYY-MM-DD HH:mm:ss")

		let query = "insert into users (username, password, totp_secret, created_at, real_name, blab_name) values(";
		query += "'" + username + "',";
		query += "'" + crypto.createHash('md5').update(password).digest("hex") + "',";
		query += "'" + speakeasy.generateSecret({ length: 20 }).base32 + "',";
		query += "'" + mysqlCurrentDateTime + "',";
		query += "'" + realName + "',";
		query += "'" + blabName + "'";
		query += ");";
		// START BAD CODE
		console.log(query);
		// END BAD CODE 

		db.query(query, (error, results) => {
      if (error)
      {
        throw error
      }
    });
		return callback(null, [{'username': username}]);
		// /* END EXAMPLE VULNERABILITY */

		// emailUser(username);
	} catch (err) {
		console.error(err);
    return callback(err);
	}
}