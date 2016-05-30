var request = require('request');
var Q = require('q');
var secrets = require('./secrets');

function search(query) {
    var deferred = Q.defer();
    var queryString = {
	part: 'snippet',
	type: 'video',
	maxResults: 10,
	order: 'relevance',
	q: query,
	fields: 'items(id(videoId),snippet(title, thumbnails(high(url))))',
	key: secrets.yt.apiKey
    };

    request({
	url: 'https://www.googleapis.com/youtube/v3/search',
	json: true,
	qs: queryString
    }, handleResponse);
    
    return deferred.promise;

    function handleResponse(err, incomingMessage, resp) {
	if (err || resp.error) {
            deferred.reject(err || resp);
	} else {
            deferred.resolve(resp.items.map(function (item) {
             return {
                 trackId: item.id.videoId,
                 imageUrl: item.snippet.thumbnails.high.url,
                 title: item.snippet.title
             };
           }));
       }
    }
}

module.exports.search = search;
