const http = require('http');

const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('questions.db');

db.serialize(function() {
    // db.run("CREATE TABLE quiz (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT, description TEXT status INT)");
    // db.run("CREATE TABLE quiz_category (quiz_id INT, category_id INT)");
    // db.run("CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT, description TEXT, order INT, status INT)");
    // db.run("CREATE TABLE category_question (category_id int, question_id INT)");
    db.run("CREATE TABLE if not exists question (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT, number INTEGER, status INTEGER, complexity INTEGER)");

    var stmt = db.prepare("INSERT INTO question (question, answer, number, status, complexity) VALUES (?,?,?,?,?)");
    stmt.run('Первый вопрос', 'Получилось', 1, 1, 0);
    stmt.finalize();
  
    db.each("SELECT * FROM question", function(err, row) {
        console.log("User id : " + row.id);
    });
});

db.close();

const html = `
    <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Основы Node.js</title>
            <link rel="stylesheet" href="app.css">
        </head>
        <body>
            <h1>Основы Node js</h1>
            <button>Нажми на меня</button>
            <script src="app.js"></script>
        </body>
    </html>`;
const css = `
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }`;
const js = `
    const button = document.querySelector('button');
    button.addEventListener('click', event => alert('OLOLO'));`;

const requestHandler = (request, response) => {
    switch(req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        case '/app.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(css);
        case '/app.js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(js);
        default:
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('404 Не найдено');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if(err) {
        return console.log('something bad happend', err);
    } else {
        console.log(`server is listening on ${port}`);
    }
});