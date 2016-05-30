var React = require('react');
var ytPlayer = require('./yt-player');

function PlayerComponent(dispatcher) {
    var Player = React.createClass({
	componentDidMount: function () {
	    var id = this.props.id;
	    ytPlayer({
		id: id,
		height: 400,
		width: 600
	    }).then(player => this._player = player);
	},
	shouldComponentUpdate: function (props) {
	    var id = this.props.id;
	    
	    if (this._player) {

		if (props.track && props.track !== this.props.track) {
		    this._player.loadTrack(props.track);
		}

		if (props.volume !== this.props.volume) {
		    this._player.setVolume(props.volume);
		}
	    }
	    
	    return false;
	},
	render: function () {
	    return (<div id={ this.props.id }></div>);
	}
    });

    return Player;
}

module.exports = PlayerComponent;
