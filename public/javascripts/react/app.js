'use strict';

var ExpenseApp = React.createClass({
	displayName: 'ExpenseApp',

	handleGetExpenses: function handleGetExpenses(results) {
		this.setState({ expenses: results });
	},
	getInitialState: function getInitialState() {
		return {
			expenses: []
		};
	},
	componentDidMount: function componentDidMount() {
		$.get('/expenses', this.handleGetExpenses);
	},
	render: function render() {
		return React.createElement(
			'h2',
			{ className: 'myclass' },
			'sometext'
		);
	}

});

ReactDOM.render(React.createElement(ExpenseApp, null), document.getElementById('content'));
