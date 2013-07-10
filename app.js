// Announce
console.log('Booting Mineshafter Squared API');

/**
 * Module dependencies.
 */
var
    // Imports
    fs        = require('fs'),
    path      = require('path'),
    express   = require('express'),
    config    = require('config').application,
    dir       = require('config').directories;

/**
 * Basic setup.
 */
var app = express();
app.set('port', process.env.PORT || config.port);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);

/**
 * Development only.
 */
if ('development' == app.get('env')) {
  console.warn('In Development Mode');
  app.use(express.errorHandler());
  app.set('views', __dirname + '/public');
  app.engine('html', require('ejs').renderFile);
}

/**
 * Models setup.
 */
app.set('models', require('./models'));

/**
 * API calls.
 * This is pretty neat, turns each route group into essentially a plugin.
 * To extend the api just drop another group of routes in the routes folder, and away we go!
 */
var routes = fs.readdirSync(dir.routes);

routes.forEach(function (file) {
  var filePath = path.resolve('./', dir.routes, file);
  var route = require(filePath);
  route.init(app);
});

/**
 * Finish up and launch!
 */
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));


