/**
 * Entry point for plugin based routes
 */
exports.init = function(app) {
    /**
     * GET Skin
     */
    app.get('/skin/:username', fetchSkin);
    
    /**
     * GET Cloak
     */
    app.get('/cloak/:username', fetchCloak);
    
    
    /**
     * Implementations
     */
    function fetchSkin(request, response) {
        
    }
    
    function fetchCloak(request, response) {
        
    }
}