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
var NewExpense = React.createClass({
	handleKeypress:function(event){
		if(event.which!==13){
			return;
		}

		this.props.addNewExpense();},
	render:function(){
		return (<input type="text" className="add-expense-input form-control" onKeypress="this.handleKeypress" />);
	}
});
var ExpenseApp = React.createClass({
	addItem:function(){

	},
	removeItem:function(id){
		this.state.expenses = this.state.expenses.filter(function(currentElem){
			return currentElem.id!==id;
		});
		this.setState({expenses:this.state.expenses})
	},
	handleGetExpenses:function(results){
		this.setState({expenses:results,newExpense:''})
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
		return (<div><NewExpense addNewExpense={this.addItem}/><div className="expense-items">{expenseNodes}<hr /><ExpenseTotal total={this.getTotal()}/></div></div>);
	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));