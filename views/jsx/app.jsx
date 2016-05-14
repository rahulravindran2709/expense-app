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
		return (<h2 className="myclass">sometext</h2>);
	}

});

ReactDOM.render(<ExpenseApp />,document.getElementById('content'));