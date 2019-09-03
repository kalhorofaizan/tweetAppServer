const express = require('express');
const { varifyjwt } = require('../core/jwtfunction');
const users = require('../models/user_module');
const tweet = require('../models/post_module');
const route = express.Router();

route.post('/send', varifyjwt, (req, res, next) => {
	users.findOne({ email: req.decode.email }, (err, data) => {
		console.log(data);
		console.log(err);
		console.log(req.decode.email);
		if (!data) {
			return res.json({
				success: false,
				message: 'user not found'
			});
		} else {
			const newtweet = tweet({
				message: req.body.message,
				name: req.decode.name,
				userid: data.id
			});

			newtweet.save().then(() => {
				return res.status(200).json({
					success: true,
					message: 'tweet save'
				});
			});
		}
	});
});

route.get('/', varifyjwt, (req, res, next) => {
	tweet
		.find({})
		.sort('-postdate')
		.skip(30)
		.limit(10)
		.exec((err, data) => {
			res.status(200).json({
				success: true,
				data: data
			});
		});
});

module.exports = route;
