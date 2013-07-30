/**
 * Utils.js
 * Some helpful utilities for the API
 */

/**
 * Logger Middleware
 */
module.exports.logger = function(request, response, next) {
    var message = "--- ";
    
    message += request.route.method.toUpperCase() + " ";
    message += request.route.path + " ";
    
    // log the originating IP address
    var hops = request.ips.length;
    message += "FROM " + request.ips[hops-1];
}