
var Client                = require('castv2-client').Client;
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
var mdns                  = require('mdns');




var module = module.exports = {};

module.init = function(){

    var client = module.client = new Client();
    
    module.chromecast = {
        "status": [{ "statusText": "still unknown" }],
        "service": {}
    };

    var browser = mdns.createBrowser(mdns.tcp('googlecast'));

    browser.on('serviceUp', function(service) {
        module.chromecast.service = service;
        module.connectClient(service.addresses[0])
    });
    

    browser.start();



    client.on('error', function(err) {
        console.log('Error: %s', err.message);
        client.close();
    });
}

module.connectClient = function(host){
    module.client.connect(host, function() {
        
    });
}


module.getChromecastStatus = function(){

    if(module.client.connection){
        module.client.getStatus(function(err, statusResponse){
            module.chromecast.status = statusResponse;
        })
    }
    return module.chromecast.status;
    
}
module.getChromecastService = function(){
    return module.chromecast.service;
}


