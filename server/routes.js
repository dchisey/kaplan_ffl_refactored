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

	app.post('/leaderboard', (req, res) => {
		WeeklyResult.aggregate([
			{ $sort: { Week: 1 } },
			{
				$addFields: {
					juggernauts: {
						$sum: {
							$cond: {
								if: { $eq: ['$High', '$Pts'] },
								then: 1,
								else: 0
							}
						}
					}
				}
			},
			{
				$project: {
					_id: 0,
					owner: '$Owner',
					year: '$Year',
					totalPts: '$Pts',
					juggernauts: 1,
					elite: '$Elite',
					abysmal: '$Abyssmal'
				}
			},
			{
				$facet: {
					weekly: [
						{ $sort: { totalPts: -1 } },
						{
							$project: {
								_id: 0,
								owner: 1,
								year: 1,
								totalPts: 1,
								juggernauts: 1,
								elite: 1,
								abysmal: 1
							}
						}
					],
					annual: [
						{ $sort: { Week: 1 } },
						{
							$group: {
								_id: {
									owner: '$owner',
									year: '$year'
								},
								averagePts: { $avg: '$totalPts' },
								totalPts: { $sum: '$totalPts' },
								juggernauts: {
									$sum: {
										$cond: {
											if: { $eq: ['$high', '$totalPts'] },
											then: 1,
											else: 0
										}
									}
								},
								history: { $push: {
									owner: '$owner',
									year: '$year',
									totalPts: '$totalPts',
									week: '$week',
									elite: '$elite',
									abysmal: '$abysmal'
								}}
							}
						},
						{
							$project: {
								_id: 0,
								owner: '$_id.owner',
								year: '$_id.year',
								averagePts: 1,
								totalPts: 1,
								juggernauts: 1,
								history: 1,
								postseason: {
									$slice: [ '$history', -2 ]
								},
								regseason: {
									$slice: [ '$history', { $subtract: [{ $size: '$history' }, 2] } ]
								}
							}
						}
					],
					allTime: [
						{
							$group: {
								_id: '$owner',
								averagePts: { $avg: '$totalPts' },
								totalPts: { $sum: '$totalPts' },
								juggernauts: {
									$sum: {
										$cond: {
											if: { $eq: ['$high', '$totalPts'] },
											then: 1,
											else: 0
										}
									}
								},
								elite: { $sum: '$elite' },
								abysmal: { $sum: '$abysmal' }
							}
						},
						{
							$project: {
								_id: 0,
								owner: '$_id',
								averagePts: 1,
								totalPts: 1,
								juggernauts: 1,
								elite: 1,
								abysmal: 1
							}
						},
						{ $sort: { totalPts: -1 } }
					]
				}
			}
		], (err, data) => {
			console.log(err)
			res.json(data[0])
		})

		
	})

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


// [
// 	{
// 		owner: 'Dan Hisey',
// 		top10scores: [{ year: 2009, week: 13, pts: 150 }], {etc}
// 		bottom10scores: [{ year: 2009, week: 13, pts: 150 }, {etc}],
// 		seasonAvgs: {
// 			2009: 70,
// 			2010: 80,
// 			2011: 90
// 		}
// 	},
// ]
