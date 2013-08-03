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
        response.writeHead(307, { // Temporary Redirect
            'Location': 'http://mineshaftersquared.com/game/get_skin/' + request.params.username
        });
    }
    
    function fetchCloak(request, response) {
        response.writeHead(307, {
            'Location': 'http://mineshaftersquared.com/game/get_cloak/' + request.params.username
        });
    }
}
