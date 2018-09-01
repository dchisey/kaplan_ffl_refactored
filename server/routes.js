'use strict';

const data = require('./controllers');
const mongoose = require('mongoose');
const WeeklyResult = require('./models');
const path = require('path')
const bodyParser = require('body-parser')

module.exports = function(app) {
	app.use(bodyParser.text())

	app.get('/api/headtohead', (req, res) => {
		const firstOwner = new RegExp(req.body.firstOwner, 'i');
		const secondOwner = new RegExp(req.body.secondOwner, 'i');

		WeeklyResult.find({}, (err, data) => {
			res.send(data)
			console.log(err)
		})
	});

	app.post('/api/leaguecomparison', (req, res) => {
		const { weekStart, weekEnd, startYear, endYear } = JSON.parse(req.body)
		WeeklyResult.aggregate([
			{
				$match: { Week: { $gte: weekStart, $lte: weekEnd }}
			},
			{
				$sort: { Week: 1 }
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
						Week: '$Week',
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
			console.log(data[0].History)
			console.log(err)
			res.json(data);
		});
	});

	app.get('*', (req, res) => {
		const url = path.join(__dirname, '../client/build/index.html')
		res.sendFile(url, function(err) {
			console.log(url)
			if(err) {
				res.status(500).send(err)
			}
		})
	})
}
