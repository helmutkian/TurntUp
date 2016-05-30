var React = require('react');

function SearchComponent(dispatcher) {

    var SearchForm = React.createClass({
	getInitialState: function () {
	    return { q: '' };
	},
	handleChange: function (event) {
	    this.setState({ q: event.target.value });
	},
	handleSubmit: function (event) {
	    event.preventDefault();
	    dispatcher.emit('search', this.state.q);
	},
	render: function () {
	    return (
		    <form onSubmit={ this.handleSubmit }>
		    <input type="text" onChange={ this.handleChange } />
		    <button type="submit">Search</button>
		    </form>
	    );
	}
    });

    var SearchResult = React.createClass({
	handleClick: function (event) {
	    event.preventDefault();
	    dispatcher.emit(event.target.name + '.loadTrack', this.props.result.trackId);
	},
	render: function () {
	    var result = this.props.result;

	    return (
		    <li>
		    <img src={ result.imageUrl } />
		    { result.title }
		    <button type="button" name="left" onClick={ this.handleClick }>Left</button>
		    <button type="button" name="right" onClick={ this.handleClick }>Right</button>
		    </li>
	    );
	}
    });

    var SearchResults = React.createClass({
	render: function () {
	    var results = this.props.results
		    .map(result => (<SearchResult key={ result.trackId } result={ result } />));
	    return (<ul>{ results }</ul>);
	}
    });

    var Search = React.createClass({
	render: function () {
	    return (
		    <div>
		    <SearchForm />
		    <SearchResults results={ this.props.results } />
		    </div>
	    );
	}
    });

    return Search;
}

module.exports = SearchComponent;
