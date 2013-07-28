/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET Skin
     */
    app.get('/skin', fetchSkin);
    
    /**
     * GET Cloak
     */
    app.get('/skin', fetchCloak);
    
    
    /**
     * Implementations
     */
    function fetchSkin(){}
    
    function fetchCloak(){}
}