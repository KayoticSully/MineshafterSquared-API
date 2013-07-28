/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * API Calls
     */
    
    // GET index
    app.get('/', function(request, response){
        response.redirect("http://mineshaftersquared.com");
    });
}