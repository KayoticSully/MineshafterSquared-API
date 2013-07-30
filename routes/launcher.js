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
    function news(request, response) {
        response.send("News Page Not Yet Available");
    }
}