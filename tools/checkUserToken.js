const {db} = require("../config/db.config");

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if ( authHeader == null ) {
        return res.status(401).send({ success: 0, data: "Unauthenticated" });
    }
    const myToken = authHeader.split(': ')
    console.log('Check user auth with token:')
    console.log("===========================")
    console.log(myToken[1])
    console.log("===========================")
    const creds = myToken[1].split('_')


    db.query(
        
        //bad code - SQLi
        `SELECT * from users where username='`+creds[0]+`' and password='`+creds[1]+`'`,
    
        //good code
        //`SELECT * from users where password = ?`,
        //[myToken[1]],
        (error, results, fields) => {
            console.log('Results: ' + results)
            if (error || results.length == '0') {
                console.log('User NOT authorized')
                console.log('DB Error: '+error)
                //return callback(error);
                return res.status(403).send({ success: 0, data: "Forbidden" });
            }
            else {
                console.log('User IS authorized')
                req.user = results[0].username
                //console.log('User: '+req.user)
                next()
            }
        }
    );
}