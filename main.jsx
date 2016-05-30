var React = require('react');
var ReactDOM = require('react-dom');
var EventEmitter = require('events');
var request = require('request');

var dispatcher = new EventEmitter();
var Search = require('./search.jsx')(dispatcher);
var Player = require('./player.jsx')(dispatcher);
var Fader = require('./fader.jsx')(dispatcher);


var App = React.createClass({
    getInitialState: function () {
	return {
	    searchResults: [],
	    leftTrack: null,
	    leftVolume: 100,
	    rightTrack: null,
	    rightVolume: 100,
	    fade: 50
	};
    },
    componentDidMount: function () {

	dispatcher.on('search', q => {
	    request({
		method: 'POST',
		url: window.location.href + 'search',
		json: true,
		body: { q: q }
	    }, (err, res) => {
		this.setState({ searchResults: res.body });
	    });
	});
	
	dispatcher.on('left.loadTrack', trackId => {
	    this.setState({ leftTrack: trackId  });
	});

	dispatcher.on('right.loadTrack', trackId => {
	    this.setState({ rightTrack: trackId  });
	});

	dispatcher.on('fade', fade => {
	    this.setState({ fade: fade });
	    if (fade == 50) {
		this.setState({ leftVolume: 100, rightVolume: 100 });
	    } else if (fade < 50) {
		this.setState({ leftVolume: 100, rightVolume: fade * 2 });
	    } else {
		this.setState({ leftVolume: 100 - (fade - 50) * 2, rightVolume: 100 });
	    }
	});

    },
    render: function () {
	var leftTrack = this.state.leftTrack;
	var leftVol = this.state.leftVolume;
	var rightTrack = this.state.rightTrack;
	var rightVol = this.state.rightVolume;
	return (
		<div>
		<Player id={ 'left' } track={ leftTrack } volume={ leftVol }/>
		<Fader fade={ this.state.fade } />
		<Player id={ 'right' } track={ rightTrack } volume={ rightVol } />
		<Search results={ this.state.searchResults } />
		</div>
	);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
