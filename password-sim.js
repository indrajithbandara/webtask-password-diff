//
// Install:
//    $ sudo npm install wt -g
//    $ wt init <youremail>
//    $ wt create password-sim.js --name password-similarity \
//                        

var distance = require("fast-levenshtein");

module.exports = function (ctx, callback) {
    
    // Emperical number to prevent  a lot of false positives
    var MAX_SIMILARITY = 0.7;
   
    // Checks and returns the similarity ration of 2 strings using the `distance` algorithm
    var similarity_ratio = function(a, b) {
        
        if (!a || !b || !a.length || !b.length) return 0
  
        if (a === b) return 1
  
        var d = distance.get(a.toLowerCase(), b.toLowerCase())
        
        var longest = Math.max(a.length, b.length)
        
        return (longest-d)/longest
    }
    
    // Require only safe params. Can be extended to require more parameters
    var safe_params = ['password', 'username', 'email'];
    
    for (var param in safe_params)
        if (!ctx.data[safe_params[param]])
            return callback(new Error('The `' + safe_params[param] + '` parameter must be provided.'));
    
    var checked_params = safe_params.slice(1);
    for (var attribute in checked_params) {
        var value = ctx.data[checked_params[attribute]];
        var password = ctx.data['password'];
        
        if (value) {
            var value_trimmed = value.trim();
            if ((value.indexOf(password) > -1) || (password.indexOf(value) > -1) || (similarity_ratio(password, value_trimmed) > MAX_SIMILARITY)) {
                return callback(null, { verdict: false, detail: "The password is too similar to the `" + checked_params[attribute] + '`'});
            }
        }
        else {
            continue;
        }
    }
    // Nothing similar with that password
    return callback(null, { verdict: true});
}