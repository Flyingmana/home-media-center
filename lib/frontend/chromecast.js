
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
        console.log('chromecast Service found');
        module.chromecast.service = service;
        setTimeout(function(){
            module.connectClient(service.addresses[0])
        },5000)
    });
    browser.on('serviceChanged', function(service) {
        console.log('chromecast Service has changed');
    });
    browser.on('serviceDown', function(service) {
        console.log('chromecast Service is gone down');
        module.cleanupClient();
    });
    

    browser.start();



    client.on('error', function(err) {
        console.log('Chromecast Client Error: %s', err.message);
        console.log('Chromecast Client Full Error: %s', err);
        module.cleanupClient();
        //throw err;
    });
}

module.cleanupClient = function(){
    module.client.close();
    module.client.emit('close');
    module.client.heartbeat.stop();
    module.client.receiver.emit("close");
    module.client.heartbeat  = null;
    module.client.receiver   = null;
    module.client.connection = null;
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


