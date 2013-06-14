/**
 * App Constants
 */
const
    ROUTE_DIR = 'routes',
    MODEL_DIR = 'models',
    APP_PORT  = 80;

/**
 * Module dependencies.
 */
var
    // Imports
    fs        = require('fs'),
    path      = require('path'),
    express   = require('express'),
    Sequelize = require('sequelize'),
    config    = require('./config'),
    // Other
    routes    = fs.readdirSync(ROUTE_DIR),
    models    = fs.readdirSync(MODEL_DIR);

/**
 * Basic setup.
 */
var app = express();
app.set('port', process.env.PORT || APP_PORT);
app.use(express.logger('dev'));
app.use(app.router);

//Development only.
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * Sequelize Setup
 */
var sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host : config.db.host
});

// Database Models
models.forEach(function (file) {
  var filePath  = path.resolve('./', MODEL_DIR, file);
  var modelName = path.basename(filePath, '.js');
  var model = sequelize.import(filePath);
});

/**
 * API Calls.
 * This is pretty neat, turns each route group into essentially a plugin.
 * To extend the api just drop another group of routes in the routes folder, and away we go!
 */
routes.forEach(function (file) {
  var filePath = path.resolve('./', ROUTE_DIR, file);
  var route = require(filePath);
  route.init(app);
});

/**
 * Finish up and launch!
 */
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));