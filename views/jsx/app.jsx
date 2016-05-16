var ExpenseItem = React.createClass({
	deleteExpense:function(){
		this.props.handleDelete(this.props.expenseProp.id);
	},
	render :function(){
		return (<div className="expense-item "><span className="expense-text pull-left">{this.props.expenseProp.name}</span>
			<span className="expense-amount">${this.props.expenseProp.value}</span>
			<a className="remove-expense pull-right" onClick={this.deleteExpense}>X</a></div>);
	}
});


var ExpenseTotal = React.createClass({
	
	render:function(){
		return (<div className="expense-total">Grand Total:<span className="total-amount">${this.props.total}</span></div>);
	}

	});

var ExpenseApp = React.createClass({
	removeItem:function(id){
		console.log('remove'+id);
		this.state.expenses = this.state.expenses.filter(function(currentElem){
			return currentElem.id!==id;
		});
		this.setState({expenses:this.state.expenses})
	},
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
		var expenseAppComponent = this;
		var expenseNodes = this.state.expenses.map(function(currentExpense){
			return (<ExpenseItem key={currentExpense.id} expenseProp={currentExpense} handleDelete={expenseAppComponent.removeItem}/>);
		});
		return (<div className="expense-items">{expenseNodes}<hr /><ExpenseTotal total={this.getTotal()}/></div>);
	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));