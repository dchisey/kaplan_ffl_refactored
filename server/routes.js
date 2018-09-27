'use strict';

const data = require('./controllers');
const mongoose = require('mongoose');
const WeeklyResult = require('./models');
const path = require('path')
const bodyParser = require('body-parser')

module.exports = function(app) {
	app.use(bodyParser.text())

	app.post('/api/leaguecomparison', (req, res) => {
		const { weekStart, weekEnd, startYear, endYear, weeksIncluded } = JSON.parse(req.body)
		console.log(`Include postseason: ${weeksIncluded}`)
		const matchQuery = startYear === endYear ? 
					[
						{ Year: startYear, Week: { $gte: weekStart, $lte: weekEnd } }
					]
					: [
						{ Year: startYear, Week: { $gte: weekStart, $lte: weeksIncluded } },
						{ Year: { $gt: startYear, $lt: endYear }, Week: { $lte: weeksIncluded } },
						{ Year: endYear, Week: { $lte: weekEnd } }
					]
		
		WeeklyResult.aggregate([
			{
				$match: { $or: matchQuery }
			},
			{
				$sort: { Year: 1, Week: 1 }
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
					Year: { $max: '$Year' },
					History: { $push: { 
						Pts: '$Pts',
						Elite: '$Elite',
						Superior: '$Superior',
						MeanPlus: '$MeanPlus',
						MeanMinus: '$MeanMinus',
						Inferior: '$Inferior',
						Abyssmal: '$Abyssmal',
						Week: '$Week',
						Year: '$Year',
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
