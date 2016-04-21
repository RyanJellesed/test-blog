var TwitterCard = React.createClass({
	

	getInitialState: function () {
		return {
			tweets: []
		}
	},
	loadTweetsFromServer: function () {
		var self = this;
		$.ajax({
			url: '/api/tweets/drumpf',
			method: 'GET'
		}).done(function (data) {
			self.setState({ tweets: data })
		})
	},
	componentDidMount: function () {
		this.loadTweetsFromServer();
	},
	render: function () {
		console.log(this.state.tweets)

		var twitterCards = this.state.tweets.map(function (tweet) {
			return (
				<div className="row">
					<div className="col-md-4">             
	              		<div className="panel panel-primary">
	                    	<div className="panel-heading">
	                        	<h3 className="panel-title">Tweet Card</h3>
	                        	<a href="#">
	                    			<img className="img-circle" src={ tweet.profile_image } alt="twitter profile"/></a>
	                    	</div>
	                    	
	                    	<div className="panel-body">
													<h4 className="media-heading"> { tweet.user_name } </h4>
													<p> { tweet.text } </p>
													<p> {tweet.created_at } </p>                 			
	                    	</div>
	                    </div>
	           	 	</div>  
            	</div>
			)
		})
		
		return (
			<div>
				{ twitterCards }
			</div>
		)
	}

});

React.render(<TwitterCard/>,
	document.getElementById('twitter-card'));