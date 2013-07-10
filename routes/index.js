/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET home page.
     */
    app.get('/', function(req, res){
        res.render('test.html');
    });
}