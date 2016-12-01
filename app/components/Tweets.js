import React from 'react';
import $ from 'jquery';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.getTweets = this.getTweets.bind(this);
    this.tweets = this.tweets.bind(this);
    this.tweet = this.tweet.bind(this);
    this.state = { tweets: [] };
  }

	getTweets(e) {
    e.preventDefault()
    $.ajax({
      url: `/tweets/${this.refs.handle.value}`,
      type: 'GET'
    }).done( tweets => {
      this.setState({ tweets });
      this.refs.tweetForm.reset();
    });
  }

	tweets() {
		return this.state.tweets.map( tweet => {
			return(
				<li className="collection-item" key={tweet.id}>
					{tweet.text}
				</li>
			)
		});
	}

	tweet(e) {
		e.preventDefault();
		$.ajax({
			url: '/tweets',
			type: "POST",
			data: { tweet: this.refs.tweet.value }
		}).done( tweet => {
			console.log(tweet.text);
			this.refs.postTweet.reset();
		})
	}

	render() {
    return (
      <div>
        <h3 className="text-center">Tweets</h3>
        <form ref="postTweet" onSubmit={this.tweet}>
        	<input ref="tweet" placeholder="post a tweet" />
        </form>
        <form ref="tweetForm" onSubmit={this.getTweets}>
          <input ref="handle" placeholder="handle" />
        </form>
        <ul className="collection">
         {this.tweets()}
        </ul>
      </div>
    )
  }
}

export default Tweets;