var React = require('react');

function FaderComponent(dispatcher) {
    var Fader = React.createClass({
	handleChange: function (event) {
	    var fade = event.target.value;
	    dispatcher.emit('fade', fade);
	},
	render: function () {
	    var fade = this.props.fade;
	    return (<input type="range" min="0" max="100" onChange={ this.handleChange } value={ fade }/>);
	}
    });

    return Fader;
}

module.exports = FaderComponent;
