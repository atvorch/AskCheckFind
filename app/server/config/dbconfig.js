/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./quiz.db');

/* Init car and driver tables if they don't exist */
let init = function () {

    db.run("CREATE TABLE if not exists question" +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT," + 
        " question TEXT," + 
        " answer TEXT," + 
        " number INTEGER," + 
        " status INTEGER," + 
        " complexity INTEGER" + 
        ")");
};

module.exports = {
    init: init,
    db: db
};

