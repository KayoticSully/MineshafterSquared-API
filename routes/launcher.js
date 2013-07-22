/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET version
     */
    app.get('/launcher/version', version);
    
    
    /**
     * Implementations
     */
    
    // Version
    function version(request, response){
        // get launcher version
        // TODO: Pull version number from database
        //       Or should it be hardcoded?
        response.send("2");
    }
}