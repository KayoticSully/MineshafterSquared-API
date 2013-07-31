/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * API Calls
     */
    
    // GET news
    app.get('/news', news);
    
    
    /**
     * Implementations
     */
    var restler = require('restler');
    var tumblr  = require('config').tumblr;
    var cache   = require('memory-cache');
    
    var url = tumblr.apiUrl + tumblr.blogUrl + "/posts";
    var options = {
        query : {
            api_key : tumblr.oauthKey
        }
    }
    
    function news(request, response) {
        
        var cacheData = cache.get('postData');
        
        if (cacheData == null) {
            restler.get(url, options).on('success', processResponse).on('error', error);
        } else {
            respond(cacheData);
        }
        
        // callbacks
        function processResponse(data, res){
            cache.put('postData', data, 60000);
            respond(data);
        }
        
        function respond(data) {
            var local = {
                posts: data.response.posts
            }
            
            response.render('news', local);
        }
        
        function error(message) {
            response.send("Error" + message);
        }
    }
}