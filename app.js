/**
 * App Constants
 */
const
    ROUTE_DIR = 'routes',
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
    sequelize = new Sequelize(config.db.host, config.db.user, config.db.password);

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