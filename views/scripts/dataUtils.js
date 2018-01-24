
module.exports = {
	splitData: (data, firstOwnerRaw, secondOwnerRaw) => {
		const firstOwner = new RegExp(firstOwnerRaw, 'i');
		const secondOwner = new RegExp(secondOwnerRaw, 'i');

		let splitData = {
			first: [],
			second: []
		};


		for(let i = 0; i < data.length; i++) {
			if(data[i].Owner.match(firstOwner)) {
				splitData.first.push(data[i]);
			} else {
				splitData.second.push(data[i]);
			}
		}

		return splitData;

	},
	compare: (data) => {

		for(let i = 0; i < data.first.length; i++) {

			let first = data.first[i],
				second = data.second[i];


			if(first.Week == second.Week) {
				//compare the two scores
				let winningScore = Math.max(first.Pts, second.Pts);

				//assign winner
				if(winningScore == first.Pts) {
					first.winner = true;
					second.winner = false;
				} else {
					second.winner = true;
					first.winner = false;
				}

				//find matchup quality
				const fields = ['Abyssmal', 'Inferior', 'MeanMinus', 'MeanPlus', 'Superior', 'Elite'];

				for(let j = 0; j < fields.length; j++) {
					let firstRating = first[fields[j]],
						secondRating = second[fields[j]];

					if(firstRating && firstRating == secondRating) {
						first.matchupRating = fields[j];
						second.matchupRating = fields[j];
					}
				}
			}
		}

		return data;
	},
	qualityScore: (ownerData) => {
		let initialValue = {
			elite: 0,
			superior: 0,
			meanPlus: 0,
			meanMinus: 0,
			inferior: 0,
			abyssmal: 0
		}

		const seasonBreakdown = ownerData.map(entry => ({
			elite: entry.Elite,
			superior: entry.Superior,
			meanPlus: entry.MeanPlus,
			meanMinus: entry.MeanMinus,
			inferior: entry.Inferior,
			abyssmal: entry.Abyssmal
		})).reduce((prev, curr) => {
			Object.keys(prev).forEach(key => {
				prev[key] = (prev[key] || 0) + curr[key];
			})

			return prev;
		}, initialValue)


		const qs = Object.keys(seasonBreakdown).reduce((prev, curr, ) => {
			return (prev || 0) + seasonBreakdown[curr];
		}, 0)

		return { seasonBreakdown, qs };
	},
	sumStats: (data, stat, decimalPlaces, absValue) => {
		const calculation = data.map(week => week[stat])
							    .reduce((prev, curr) => prev + curr, 0)
							    .toFixed(decimalPlaces);

		return absValue !== 'undefined' ? Math.abs(calculation) : calculation;
	}
}