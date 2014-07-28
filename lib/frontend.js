
var express = require('express')
var frontChromecast = require('./frontend/chromecast.js')
var watchever       = require('./media/watchever.js')

function Frontend(){
    if(!(this instanceof Frontend)) return new Frontend();

    var self = this;
}


Frontend.prototype.init = function(frontendConfig){

    var app;
    console.log(frontendConfig);
    frontChromecast.init();
    watchever.init(frontChromecast.client);
    
    this.app = app = express();

    app.set('title', 'Home Media Center');
    
    app.use(express.static(__dirname+'/../public'));
    app.use('/', express.static(__dirname+'/../public/index.html'));
    
    app.get('/hello', function (req, res) {
        res.send('Hello World')
    })
    
    app.get('/api/chromecast/status.json', function(req, res){
        res.send({
            "status": frontChromecast.getChromecastStatus(),
            "service": frontChromecast.getChromecastService()
        })
    })

    app.get('/api/chromecast/watchever.json', function(req, res){
        res.send({
            "lastTracks": watchever.lastTracks
        })
    })
    
    
    app.listen(frontendConfig.port)
    console.log('frontend Server started');
}




module.exports = Frontend;
