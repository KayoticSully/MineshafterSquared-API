/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET version
     */
    app.get('/version', version);
    app.get('/update', version); // deprecated
    
    /**
     * POST login
     */
    app.post('/login', login);
    app.post('/get_version', login); // deprecated
    
    /**
     * Implementations
     * Note: This is within the init function to ensure each function
     *       has access to the app object.  This might end up being a
     *       memory hog, or might make no difference what so ever.
     *       Just something to keep in mind
     */
    var Data = app.get('models').Data;
    var User = app.get('models').User;
    
    // Version
    function version(request, response){
        // get client version
        Data.find({ where: { key : 'client-version' } }).success(function(data){
            response.send(data.value);
        });
    }
    
    // Login
    function login(request, response){
        var username = request.body.user;
        var password = request.body.password;
        
        User.login(username, password, function(user){
            if (user) {
                response.send(''+user.session);
            } else {
                response.send('bad login');
            }   
        });
    }
}