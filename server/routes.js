'use strict';

const data = require('./controllers');
const mongoose = require('mongoose');
const WeeklyResult = require('./models');
const path = require('path')


module.exports = function(app) {

	app.get('/api/headtohead', (req, res) => {
		const firstOwner = new RegExp(req.body.firstOwner, 'i');
		const secondOwner = new RegExp(req.body.secondOwner, 'i');

		WeeklyResult.find({}, (err, data) => {
			res.send(data)
			console.log(err)
		})
	});

	app.get('/api/leaguecomparison', (req, res) => {
		const week = 14;
		WeeklyResult.aggregate([
			{
				$match: { Week: { $lte: week }}
			},
			{
				$group: {
					_id: '$Owner',
					Week: { $max: '$Week' },
					Pts: { $sum: '$Pts' },
					Elite: { $sum: '$Elite' },
					Superior: { $sum: '$Superior' },
					Inferior: { $sum: '$Inferior' },
					MeanPlus: { $sum: '$MeanPlus' },
					MeanMinus: { $sum: '$MeanMinus' },
					Abyssmal: { $sum: '$Abyssmal' },
					High: { $max: '$Pts' },
					Low: { $min: '$Pts' },
					History: { $push: { 
						Pts: '$Pts',
						Elite: '$Elite',
						Superior: '$Superior',
						MeanPlus: '$MeanPlus',
						MeanMinus: '$MeanMinus',
						Inferior: '$Inferior',
						Abyssmal: '$Abyssmal',
						WeeklyQS: { 
							$sum: [
								'$Elite',
								'$Superior',
								'$MeanPlus',
								'$MeanMinus',
								'$Inferior',
								'$Abyssmal' 
						]}
					 }}
				}
			},
			{ $sort: { Pts: 1 }}
		], (err, data) => {
			console.log(data);
			console.log(err)
			res.json(data);
		});
	});

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '/client/build/index.html'), function(err) {
			if(err) {
				res.status(500).send(err)
			}
		})
	})
}
