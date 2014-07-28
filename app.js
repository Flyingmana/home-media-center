


var config = require(__dirname+'/config/local');
console.log("config:",config);

var frontendServer = require('./lib/frontend.js')();

frontendServer.init(config.frontendServer);

var videoServer = require('./lib/media/video.js')();

//videoServer.init(config.mediaPath, config.mediaServerPort);

//videoServer.sendVideo();

