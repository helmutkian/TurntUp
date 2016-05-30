var assert = require('chai').assert;
var ytApi = require('../yt-api.js');

describe('ytApi', function () {
  describe('#search()', function () {
    it('should fetch results based on the query', function () {
	ytApi.search('vektroid').then(function (results) {

	    assert.isArray(results);
	    assert(results.length > 0);
	    
	    results.forEach(result => {
		assert.isObject(result);
		assert.property(result, 'trackId');
		assert.property(result, 'imageUrl');
		assert.property(result, 'title');
	    });
	    
	});
    });
  });
});
