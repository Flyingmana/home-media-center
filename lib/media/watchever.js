
var fs = require('fs')

var module = module.exports = {};


module.lastTracks = new Array();
module.lastTracks.push({
    'statusText': "hawhaw",
    'time': new Date().getTime()
});
module.lastTracks.push({
    'statusText': "how how",
    'time': new Date().getTime()
});
module.lastTracks.push({
    'statusText': "muhihihi",
    'time': new Date().getTime()
});

module.init = function(client){
    module.client = client;
    
    module.interval = setInterval(module.trackWatchesInterval, 1000*60*5);
    setTimeout(module.trackWatchesInterval, 1000*30)
    module.trackWatchesInterval();
    
}

module.trackWatchesInterval = function(){
    if(module.client.connection){
        module.client.getStatus(function(err, statusResponse){
            module.trackWatches(statusResponse);
        })
    }
}


module.trackWatches = function( status ){
    var alreadyTracked = function( statusText ){
        for(var i = -1, j = module.lastTracks.length; ++i < j;){
            if(module.lastTracks[i].statusText === statusText) return true;
        }
        return false;
    }
    
    var addToTracked = function( statusText ){
        var element = {
            'statusText': statusText,
            'time': new Date().getTime()
        };
        fs.appendFile('watchever.log', JSON.stringify(element)+"\n", function (err) {
            if(err != null){
                console.log(err);
            }
        });
        module.lastTracks.push(element)
        if(module.lastTracks.length > 10){
            module.lastTracks.shift();
        }
    }
    
    
    if( status.applications && status.applications[0].displayName == "Watchever" ){
        if( !alreadyTracked(status.applications[0].statusText) ){
            addToTracked(status.applications[0].statusText);
        }
    }
}


