var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

function client() {
  return new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
  });
}

router.get('/:handle', function(req, res) {
  client().get('statuses/user_timeline', { screen_name: req.params.handle }, function (err, tweets) {
    return res.json(tweets);
  });
});

router.post('/', (req, res) => {
	client().post('statuses/update', {status: req.body.tweet }, (err, tweet) => {
		return res.json(tweet);
	});
});

module.exports = router;