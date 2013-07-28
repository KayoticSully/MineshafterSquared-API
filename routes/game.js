/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET ???
     */
    app.get('/game/joinserver', joinserver);
    app.get('/game/checkserver', checkserver);
    
    
    /**
     * Implementations
     */
    var models = app.get('models');
    var url = require('url');
    
    /**
     * Note: The sessionId is sent in as token:authToken:UUID
     */
    function joinserver(request, response){
        // get query string data 
        var url_parts = url.parse(request.url, true);
        var query     = url_parts.query;
        
        // important input
        var username  = query.user;
        var sessionId = query.sessionId.split(':');
        var serverId  = query.serverId;
        
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
        // get query string data 
        var url_parts = url.parse(request.url, true);
        var query     = url_parts.query;
        
        // important input
        var username  = query.user;
        var serverId  = query.serverId;
        
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