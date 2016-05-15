var ExpenseItem = React.createClass({
	render :function(){
		return (<div className="expense-item"><span className="expense-text">{this.props.expenseProp.name}</span><span className="expense-amount">${this.props.expenseProp.value}</span></div>);
	}
});


var ExpenseTotal = React.createClass({
	
	render:function(){
		return (<div className="expense-total">Grand Total:<span className="total-amount">${this.props.total}</span></div>);
	}

	});

var ExpenseApp = React.createClass({
	handleGetExpenses:function(results){
		this.setState({expenses:results})
	},
	getTotal:function(){
		return  this.state.expenses.reduce(function(previousValue,currentValue){
			return previousValue+currentValue.value;
		},0);
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
		return (<div className="expense-items">{expenseNodes}<hr /><ExpenseTotal total={this.getTotal()}/></div>);
	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));