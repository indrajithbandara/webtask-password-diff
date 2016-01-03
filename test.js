var distance = require("fast-levenshtein");


// Emperical number to prevent  a lot of false positives
var MAX_SIMILARITY =  0.5;
   
// Checks and returns the similarity ration of 2 strings using the `distance` algorithm
var similarity_ratio = function(a, b) {
        
        if (!a || !b || !a.length || !b.length) return 0
  
        if (a === b) return 1
  
        var d = distance.get(a.toLowerCase(), b.toLowerCase())
        
        var longest = Math.max(a.length, b.length)
        
        return (longest-d)/longest
    }

console.log(similarity_ratio("dana", "thdespou")) // --> 0.5

console.log(similarity_ratio("fanis", "thdespou")) // --> 0.125

console.log(similarity_ratio("theodespou", "thdespou")) // --> 0.8
n