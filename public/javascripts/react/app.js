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
	        newExpenseName:'' ,
	        newExpenseAmount:'0.00' 
	    };
	},
	setExpense:function(boj){
		console.log('in set expense'+boj)
	},

	handleChange:function(){
		console.log('on change');
	},
	handleSubmit:function(event){
		this.props.addNewExpense({name:this.state.newExpenseName,amount:this.state.expenseAmount});
		this.setState({newExpenseInput:'',newExpenseAmount})
		return true;
	},
	handleKeypress:function(event){
		if(event.which!==13){
			return;
		}
		event.preventDefault();
		
	},
	render:function(){
		return (<form className="form" >
			<div className="form-group">
			<label htmlFor="expense-name">Expense type</label>
			<input type="text" className="add-expense-input form-control" id="expense-name" value={this.state.newExpenseName} />
			</div>
			<div className="form-group">
			<label htmlFor="expense-name">Expense type</label>
			<input type="text" className="add-expense-input form-control" id="expense-name" value={this.state.newExpenseAmount} />
			</div>
			<button className="btn btn-primary" onClick={this.handleSubmit}>Create</button></form>);
	}
});
var ModalWindow = React.createClass({
	render:function(){
		if(this.props.toggleOpen){
		return (<div className="modal-container">
			<span className="modal-close" onClick={this.props.toggleClose}>X</span>{this.props.children}
			</div>);
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
	handleClose:function(){
		this.setState({isModalOpen:false});
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
		var modalWindowNode = (<ModalWindow toggleOpen={this.state.isModalOpen} toggleClose={this.handleClose}><NewExpense /></ModalWindow>);
		var expenseTotalNode = (<ExpenseTotal total={this.getTotal()}/>);
		return (<div className="main">
			<div className="col-xs-offset-4 col-xs-4">
			<div className="expense-container">
			<div className="expense-items">{expenseNodes}
			<hr />{expenseTotalNode}</div>{newExpenseButtonNode}</div>
			</div>{modalWindowNode}
			</div>);

	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));