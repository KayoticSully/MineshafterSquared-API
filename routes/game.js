/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET version
     */
    app.get('/version/:type', version);
    app.get('/update/:type', version); // deprecated
    
    /**
     * POST login
     */
    app.post('/login', login);
    app.post('/get_version', login);
    
    
    
    /**
     * Implementations
     * Note: This is within the init function to ensure each function
     *       has access to the app object.  This might end up being a
     *       memory hog, or might make no difference what so ever.
     *       Just something to keep in mind
     */
    
    // Version
    function version(request, response){
        // get client version
        app.db.Data.find({ where: { key : 'client-version' } }).success(function(data){
            response.send(data.value);
        });
    }
    
    // Login
    function login(request, response){
        var username = request.body.user;
        var password = request.body.password;
        
        
    }
}