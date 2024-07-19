const moment = require('moment')
const fs = require('fs');
const { db,getConnection,query } = require("../config/db.config");
const User = require('../tools/User.js');
const readline = require('readline');
const util = require('util');


exports.reset = (callback) =>{
    const users = [
        User.create("admin", "admin", "Mr. Administrator"),
        User.create("admin-totp", "admin-totp", "Admin with TOTP"), 
        User.create("john", "John", "John Smith"),
        User.create("paul", "Paul", "Paul Farrington"),
        User.create("chrisc", "Chris", "Chris Campbell"),
        User.create("laurie", "Laurie", "Laurie Mercer"),
        User.create("nabil", "Nabil", "Nabil Bousselham"),
        User.create("julian", "Julian", "Julian Totzek-Hallhuber"),
        User.create("joash", "Joash", "Joash Herbrink"),
        User.create("andrzej", "Andrzej", "Andrzej Szaryk"),
        User.create("april", "April", "April Sauer"),
        User.create("armando", "Armando", "Armando Bioc"),
        User.create("ben", "Ben", "Ben Stoll"),
        User.create("brian", "Brian", "Brian Pitta"),
        User.create("caitlin", "Caitlin", "Caitlin Johanson"),
        User.create("christraut", "Chris Trautwein", "Chris Trautwein"),         
        User.create("christyson", "Chris Tyson", "Chris Tyson"),
        User.create("clint", "Clint", "Clint Pollock"),
        User.create("clyde", "Clyde", "Clyde Shtino"),
        User.create("cody", "Cody", "Cody Bertram"),
        User.create("derek", "Derek", "Derek Chowaniec"),
        User.create("eric", "Eric", "Eric Ghilani"),
        User.create("glenn", "Glenn", "Glenn Whittemore"),
        User.create("grant", "Grant", "Grant Robinson"),
        User.create("gregory", "Gregory", "Gregory Wolford"),
        User.create("jacob", "Jacob", "Jacob Martel"),
        User.create("jeremy", "Jeremy", "Jeremy Anderson"),
        User.create("johnny", "Johnny", "Johnny Wong"),
        User.create("kevin", "Kevin", "Kevin Rise"),
        User.create("kevinliu", "Kevin", "Kevin Liu"),
        User.create("scottrum", "Scott Rumrill", "Scott Rumrill"),
        User.create("stuart", "Stuart", "Stuart Sessions"),
        User.create("scottsim", "Scott Simpson", "Scott Simpson")
    ];
    processReset(users, (result) => {
        console.log('Reset: '+ result);
        if(result == "Success")
        {
            return callback(null, result);
        }
        else{
            return callback(result);
        }
    });
    
}

async function recreateDatabaseSchema() {
    
    let filepath = 'blab_schema.sql';
    let skipString = '--|\/\\*';
    skipString = skipString.replaceAll("(?=[]\\[+&!(){}^\"~*?:\\\\])", "\\\\");
    let regex = new RegExp("^(" + skipString + ").*?");
    
    const filestream = fs.createReadStream(filepath);
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });
    let lines = []
    let filestring = '';
    for await (const line of rl) {
        if (!regex.test(line)) {
            filestring += line;
        }
    }
    lines = filestring.split(';')
    try {
        for (sql of lines) {
            sql = sql.trim();
            if (sql) {
                console.log("Executing: " + sql);
                await query(sql);
            }
        }
    } catch (err) {
        console.error(err);
    } 
}
async function processReset(users, callback) {


    console.log("Entering processReset");

    // Drop existing tables and reUser.create from schema file
    await recreateDatabaseSchema();

    try {
        console.log("Getting Database connection");
        // Get the Database Connection
        // Class.forName("com.mysql.jdbc.Driver");
        let connect = await getConnection();
        const pBeginTransaction = await util.promisify(connect.beginTransaction).bind(connect);
        const pQuery = await util.promisify(connect.query).bind(connect);
        const pCommit = await util.promisify(connect.commit).bind(connect);
        const pRollback = await util.promisify(connect.rollback).bind(connect);
        const pRelease = await util.promisify(connect.release).bind(connect);
        // Adding users
        try {
            await pBeginTransaction();
            try {
                console.log("Preparing the Statement for adding users");

                for (u of users) {
                    console.log("Adding user " + u.getUserName());
                    await pQuery("INSERT INTO users (username, password, password_hint, totp_secret, created_at, last_login, real_name, blab_name) values (?, ?, ?, ?, ?, ?, ?, ?);",
                    [
                        u.getUserName(),
                        u.getPassword(),
                        u.getPasswordHint(),
                        u.gettotpSecret(),
                        u.getDateCreated(),
                        u.getLastLogin(),
                        u.getRealName(),
                        u.getBlabName()
                    ]);
                }
                await pCommit();
            } catch (err) {
                console.error("Error loading data, reverting changes: ", err);
                await pRollback();
                pRelease();
                return callback(err);
            }
            // Adding listeners
            try {
                console.log("Preparing the Statement for adding listeners");

                let randomUser;
                let listener;
                let blabber;
                for (let i = 2; i < users.length; i++) {
                    for (let j = 2; j < users.length; j++) {
                        if (Math.random() < 0.5 && users[j] !== users[i]) {
                            blabber = users[i].getUserName();
                            listener = users[j].getUserName();
                            console.log("Adding " + listener + " as a listener of " + blabber);
                            await pQuery("INSERT INTO listeners (blabber, listener, status) values (?, ?, 'Active');", [blabber, listener]);
                        }
                    }
                }
                await pCommit();
            } catch (err) {
                console.error("Error loading data, reverting changes: ", err);
                await pRollback();
                pRelease();
                return callback(err);
            }
            // Fetching blabs
            console.log("Reading blabs from file");
            let blabsContent = fs.readFileSync("files/blabs.txt", 'utf8').split('\n');
                
            console.log(blabsContent)

            // Adding blabs
            try {
                console.log("Preparing the Statement for adding blabs")
                let randomUser, username, timestamp ,vary;

                for (blab of blabsContent) {
                    randomUser = users[Math.floor(Math.random() * (users.length - 2)) + 2];
                    username = randomUser.getUserName();
                    vary = Math.floor(Math.random()* 30 * 24 * 3600);
                    timestamp = moment().subtract(vary, "seconds").format("YYYY-MM-DD HH:mm:ss");
                    console.log("Adding a blab for " + username);
                    
                    await pQuery("INSERT INTO blabs (blabber, content, timestamp) values (?,?,?);", [username, blab, timestamp]);
                }
                await pCommit();  
            } catch (err) {
                console.error("Error loading data, reverting changes: ", err);
                await pRollback();
                pRelease();
                return callback(err);
            } 
            // Comments
            try {
                // Fetching comments
                console.log("Reading comments from file");
                let commentsContent = fs.readFileSync("files/comments.txt", 'utf8').split('\n');
                // Adding comments
                console.log("Preparing the statement for adding comments");
                let count, randomUser, username, commentNum, comment, vary;

                for (let i = 1; i <= blabsContent.length; i++) {
                    count = Math.floor(Math.random() * 6);

                    for (let j = 0; j < count; j++) {
                        console.log("Adding a comment for " + username + " on blab ID " + i.toString());
                        randomUser = users[Math.floor(Math.random() * (users.length - 2)) + 2];
                        username = randomUser.getUserName();
                        vary = Math.floor(Math.random()* 30 * 24 * 3600);
                        timestamp = moment().subtract(vary, "seconds").format("YYYY-MM-DD HH:mm:ss");
                        commentNum = Math.floor(Math.random() * commentsContent.length);
                        comment = commentsContent[commentNum];
                
                        await pQuery("INSERT INTO comments (blabid, blabber, content, timestamp) values (?, ?, ?, ?);", [i, username, comment, timestamp]);
                    }
                }
                await pCommit();
                pRelease();
                console.log("Success!");
                return callback("Success"); //Success
            } catch (err) {
                console.error("Error loading data, reverting changes: ", err);
                await pRollback();
                pRelease();
                return callback(err);
            }
        } catch (err) {
            console.error("Error loading data, reverting changes: ", err);
            await pRollback();
            pRelease();
            return callback(err);
        }
    } catch (err) {
        console.error(err);
        return callback(err); //Error
    }
    
}

