/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET game/joinserver
     */
    app.get('/game/joinserver', joinserver);
    
    /**
     * GET game/checkserver
     */
    app.get('/game/checkserver', checkserver);
    
    
    /**
     * Implementations
     */
    var models = app.get('models');
    
    /**
     * Note: The sessionId is sent in as token:authToken:UUID
     */
    function joinserver(request, response){
        // get input
        var username  = request.query.user;
        var sessionId = request.query.sessionId.split(':');
        var serverId  = request.query.serverId;
        
        // first verify the user information if valid
        models.User.find({ where : ['username = ? AND uuid = ?', username, sessionId[2]] }).success(function(user){
            // make sure the user has a valid access token
            if (user != null) {
                user.getClients({ where : ['access_token = ?', sessionId[1]] }).success(function(tokens){
                    if (tokens.length > 0) {
                        user.server = serverId;
                        user.save().success(respond);
                    } else {
                        error("Bad Token");
                    }
                }).error(error); 
            } else {
                error("User not found");
            }
        }).error(error);
        
        function respond() {
            response.send("OK");
        }
        
        function error(msg){
            console.log(msg);
            response.send("Bad login");
        }
    }
    
    function checkserver(request, response){
        // get input
        var username  = request.query.user;
        var serverId  = request.query.serverId;
        
        // see if user has been validated for this server
        models.User.find({ where : ['username = ? AND server = ?', username, serverId] }).success(function(user){
            if (user != null) {
                response.send("YES");
            } else {
                error("Bad user");
            }
        }).error(error);
        
        function error(msg){
            console.log(msg);
            response.send("NO");
        }
    }
}