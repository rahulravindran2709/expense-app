var ExpenseItem = React.createClass({
	render :function(){
		return (<div className="expense-item"><span className="expense-text">{this.props.expenseProp.name}</span><span className="expense-amount">${this.props.expenseProp.value}</span></div>);
	}
});


var ExpenseApp = React.createClass({
	handleGetExpenses:function(results){
		this.setState({expenses:results})
	},
	getInitialState:function() {
	    return {
	        expenses:[] 
	    };
	},
	componentDidMount:function() {
	      $.get('/expenses',this.handleGetExpenses);
	},
	render:function(){
		var expenseNodes = this.state.expenses.map(function(currentExpense){
			return (<ExpenseItem key={currentExpense.id} expenseProp={currentExpense}/>);
		});
		return (<div className="myclass">{expenseNodes}</div>);
	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));