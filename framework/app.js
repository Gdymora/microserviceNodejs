const path = require('path');
const express = require('express');
const userRouter = require('./app/components/user/userRouter');
const app = express();
const container = require('./core/container');
const bodyParser = require('body-parser');
//const RouteManager = require('./core/routeManager');
const DatabaseMiddlewareFactoryConnect = require('./core/middleware/databaseMiddlewareFactoryConnect');

const dbConfig = {
  //type: 'mysql',
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  filename: './mydatabase.sqlite3'
};
const databaseMiddlewareFactoryConnect = new DatabaseMiddlewareFactoryConnect(dbConfig);
const dbMiddleware = databaseMiddlewareFactoryConnect.connect();
app.use(dbMiddleware);

// Get the query builder object for the connected database
//const db = dbFactory.getQueryBuilder();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 500 })
);

const middlewareRouteMenedgerThems = require('./core/middleware/routeMenedgerThems')
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('themes'));
// index page
//const pagesPath = path.join(__dirname, 'themes/default/public');
new middlewareRouteMenedgerThems(databaseMiddlewareFactoryConnect.db).generateRoute(app)

// Serve static files from the public directory
app.use(express.static( 'public'));
// Route for the React component
app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, 'react_views/react.html'));
});
app.get('/users-db', async (req, res, next) => {
  const sql = 'SELECT * FROM users';
  req.db.all(sql,(err, rows ) => {
    console.log(rows)  
});
});

app.use('/users', userRouter.init());
app.use(function (err, req, res, next) {
  const logger = container.resolve('logger');
  logger.error(err);
  res.status(500).send('Something went wrong');
});

module.exports = app;