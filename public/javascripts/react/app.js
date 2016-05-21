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
	getInitialState() {
	    return {
	        newExpenseInput:'some'  
	    };
	},
	setExpense:function(boj){
		console.log('in set expense'+boj)
	},

	handleChange:function(){
		console.log('on change');
	},
	handleKeypress:function(event){
		if(event.which!==13){
			return;
		}
		event.preventDefault();
		this.props.addNewExpense(this.state.newExpenseInput);
		this.setState({newExpenseInput:''})
		return true;
	},
	render:function(){
		return (<input type="text" className="add-expense-input form-control" value={this.state.newExpenseInput} onKeyPress={this.handleKeypress} onChange={this.handleChange}/>);
	}
});

var ModalWindow = React.createClass({
	render:function(){
		if(this.props.toggleOpen){
		return (<div className="modal-container">{this.props.children}</div>);
	}
	else{
		return false;
	}
	}
});

var ExpenseApp = React.createClass({
	addItem:function(item){
		console.log('item received'+item)
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
	openExpenseForm:function(){
		this.setState({isModalOpen:true});
	},
	getInitialState:function() {
	    return {
	        expenses:[],
	        isModalOpen:false 
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

		var newExpenseButtonNode = (<button className="btn btn-primary" onClick={this.openExpenseForm}>New Expense</button>);
		return (<div className="main"><ModalWindow toggleOpen={this.state.isModalOpen}><span>My content</span></ModalWindow><div className="expense-items">{expenseNodes}<hr /><ExpenseTotal total={this.getTotal()}/></div>{newExpenseButtonNode}</div>);

	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));