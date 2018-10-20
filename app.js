const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
let routes = require('./routes');
const app = new express();
let config = require('./config/default')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(express.static('assets/css'));
app.use(express.static('assets/img'));
app.use(express.static('assets/lib'));

var mysql = require('mysql')
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: config.DBIP,
    user: 'root',
    password: '0000',
    database: 'dev'
};
var connection = mysql.createConnection(options)
var sessionStore = new MySQLStore(options, connection);

app.use(session({
    name: 'session',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    secret: 'sometext',
    cookie: { maxAge: (31536000000) }
    //86400000 - 1 день
    //604800000 - 7 дней
    //2678400000 - 31 день
    //31536000000 - 1 год
}));


app.disable('x-powered-by');
app.set('view engine', 'ejs')

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (deadWorker, code, signal) => {
    // Restart the worker
    let worker = cluster.fork();
    // Note the process IDs
    let newPID = worker.process.pid;
    let oldPID = deadWorker.process.pid;
    // Log the event
    console.log('Worker '+oldPID+' died.');
    console.log('New worker '+newPID+' start.');
  });
} else {
    app.use('/', routes);
    app.listen(config.PORT, () => {
        console.log(`Server started on port`, config.PORT);
    });
}