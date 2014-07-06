
var connect = require('connect');
var serveStatic = require('serve-static');

function Video(){
    if(!(this instanceof Video)) return new Video();

    var self = this;
    
}

Video.prototype.init = function(directory){
    // directory = __dirname;
    //connect().use(serveStatic(directory)).listen(8080);
    console.log('serving of video files started');
}


Video.prototype.sendVideo = function(  ){
    

        console.log('start sending video');
    //videoUrl: "http://192.168.1.57:8080/Project+London-+Official+Trailer-Mobile.mp4",
    //videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",

    var Client                = require('castv2-client').Client;
    var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
    var mdns                  = require('mdns');

    var browser = mdns.createBrowser(mdns.tcp('googlecast'));

    browser.on('serviceUp', function(service) {
        console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
        ondeviceup(service.addresses[0]);
        browser.stop();
    });

    browser.start();

    function ondeviceup(host) {

        var client = new Client();

        client.connect(host, function() {
            console.log('connected, launching app ...');

            client.launch(DefaultMediaReceiver, function(err, player) {
                var media = {
                    // Here you can plug an URL to any mp4, webm, mp3 or jpg file.
                    contentId: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4'
                };

                player.on('status', function(status) {
                    console.log('status broadcast playerState=%s', status.playerState);
                });

                console.log('app "%s" launched, loading media %s ...', player.session.displayName, media.contentId);

                player.load(media, { autoplay: true }, function(err, status) {
                    console.log('media loaded playerState=%s', status.playerState);
                });

            });

        });

        client.on('error', function(err) {
            console.log('Error: %s', err.message);
            client.close();
        });

    }
    
}

module.exports = Video;
