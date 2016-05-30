var Q = require('q');

var apiDeferred = Q.defer();

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
    apiDeferred.resolve(window.YT);
}

function getYouTubeIframeApi() {
    return apiDeferred.promise;
}

function createPlayer(options) {
    var playerDeferred = Q.defer();
    var id = options.id;
    var height = options.height;
    var width = options.width;
    
    getYouTubeIframeApi().then(api => {
	var player = new api.Player(id, {
	    height: height,
	    width: width,
	    videoId: '',
	    events: {
		onReady: () => playerDeferred.resolve({
		    _player: player,
		    loadTrack: trackId => player.loadVideoById({ videoId: trackId }),
		    setVolume: volume => player.setVolume(volume)
		})
	    }
	});
    });

    return playerDeferred.promise;
}

module.exports = createPlayer;
