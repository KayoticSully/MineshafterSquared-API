/**
 * Entry point for plugin based routes
 *
 * NOTE:  This file is not even being used at the moment.
 *        This is still done through the OLD API in the launcher
 */
exports.init = function(app) {
    /**
     * API Calls
     */
    
    // GET skin/:username
    app.get('/skin/:username', fetchSkin);
    
    // GET cloak/:username
    app.get('/cloak/:username', fetchCloak);
    
    
    /**
     * Implementations
     */
    function fetchSkin(request, response) {
        response.send("Feature not yet supported.");
    }
    
    function fetchCloak(request, response) {
        response.send("Feature not yet supported.");
    }
}