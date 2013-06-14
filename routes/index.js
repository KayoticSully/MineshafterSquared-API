/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET home page.
     */
    app.get('/', function(req, res){
        var message = 'Mineshafter Squared API. There is nothing to do here, please go to <a href="http://mineshaftersquared.com">MineshafterSquared.com</a>.';
        res.send(message);
    });
}