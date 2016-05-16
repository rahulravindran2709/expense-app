"use strict";

var ExpenseItem = React.createClass({
	displayName: "ExpenseItem",

	deleteExpense: function deleteExpense() {
		this.props.handleDelete(this.props.expenseProp.id);
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "expense-item " },
			React.createElement(
				"span",
				{ className: "expense-text pull-left" },
				this.props.expenseProp.name
			),
			React.createElement(
				"span",
				{ className: "expense-amount" },
				"$",
				this.props.expenseProp.value
			),
			React.createElement(
				"a",
				{ className: "remove-expense pull-right", onClick: this.deleteExpense },
				"X"
			)
		);
	}
});

var ExpenseTotal = React.createClass({
	displayName: "ExpenseTotal",


	render: function render() {
		return React.createElement(
			"div",
			{ className: "expense-total" },
			"Grand Total:",
			React.createElement(
				"span",
				{ className: "total-amount" },
				"$",
				this.props.total
			)
		);
	}

});

var ExpenseApp = React.createClass({
	displayName: "ExpenseApp",

	removeItem: function removeItem(id) {
		console.log('remove' + id);
		this.state.expenses = this.state.expenses.filter(function (currentElem) {
			return currentElem.id !== id;
		});
		this.setState({ expenses: this.state.expenses });
	},
	handleGetExpenses: function handleGetExpenses(results) {
		this.setState({ expenses: results });
	},
	getTotal: function getTotal() {
		return this.state.expenses.reduce(function (previousValue, currentValue) {
			return previousValue + currentValue.value;
		}, 0);
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
		var expenseAppComponent = this;
		var expenseNodes = this.state.expenses.map(function (currentExpense) {
			return React.createElement(ExpenseItem, { key: currentExpense.id, expenseProp: currentExpense, handleDelete: expenseAppComponent.removeItem });
		});
		return React.createElement(
			"div",
			{ className: "expense-items" },
			expenseNodes,
			React.createElement("hr", null),
			React.createElement(ExpenseTotal, { total: this.getTotal() })
		);
	}

});

ReactDOM.render(React.createElement(ExpenseApp, null), document.getElementById('content'));
