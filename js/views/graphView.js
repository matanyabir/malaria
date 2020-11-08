const GraphMapView = Backbone.View.extend({
	className: 'graph-v',
	initialize ()
	{
		this.model.on('change:day', this.onDayChange, this);
		this.$canvas = $('<canvas height="250" width="500"></canvas>');
		this.$el.html(this.$canvas);
		return this;
	},
	// events: {
	// 	"click": "onClick",
	// },
	render: function ()
	{
		const stats = this.model.get('stats');
		const data = stats.mosquitoes;
		let time = new Date(this.model.get('time').start).getTime();
		// only until today:
		// const labels = data.map((x, i) => {
		// 	const date = new Date(time + i * 24 * 60 * 60 * 1000);
		// 	const dateStr = `${date.getDate()}.${1+date.getMonth()}`;
		// 	return dateStr
		// });
		let max = 0;
		const labels = [];
		const {periods} = this.model.get('time');
		periods.forEach(p => max += p.duration);
		let i = 0;
		while ( i<= max ) {
			const date = new Date(time + i * 24 * 60 * 60 * 1000);
			const dateStr = `${date.getDate()}.${1+date.getMonth()}`;
			labels.push(dateStr);
			i++;
		}

		const lineChartData = {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: "Mosquitoes",
						backgroundColor: "transparent",
						// hoverBackgroundColor: "rgba(97,247,250,0.2)",
						borderColor: "rgb(39,58,150)",
						hoverBorderColor: "rgb(12,5,150)",
						data: stats.mosquitoes
					},
					{
						label: "Ill mosquitoes",
						backgroundColor: "transparent",
						// hoverBackgroundColor: "rgba(97,247,250,0.2)",
						borderColor: "rgb(150,43,139)",
						hoverBorderColor: "rgb(150,10,133)",
						data: stats.illMosquitoes
					},
					{
						label: "Ill people",
						backgroundColor: "transparent",
						// hoverBackgroundColor: "rgba(97,247,250,0.2)",
						borderColor: "rgb(33,150,55)",
						hoverBorderColor: "rgb(0,150,33)",
						data: stats.ill
					},
				]
			}
		};
		const lastYear = this.model.get('lastYear');
		if (true && lastYear) {
			lineChartData.data.datasets.push(
				{
					label: "Last year mosquitoes",
					backgroundColor: "transparent",
					borderColor: "rgb(105,156,250)",
					hoverBorderColor: "rgb(66,133,250)",
					data: lastYear.mosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					label: "Last year ill mosquitoes",
					backgroundColor: "transparent",
					borderColor: "rgb(250,91,208)",
					hoverBorderColor: "rgb(250,5,190)",
					data: lastYear.illMosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					label: "Last year ill people",
					backgroundColor: "transparent",
					borderColor: "rgb(62,212,95)",
					hoverBorderColor: "rgb(0,212,60)",
					data: lastYear.ill
				}
			);
		}
		const ctx = this.$canvas[0].getContext("2d");
		this.myChart = new Chart(ctx, lineChartData, {responsive: false});
		return this;
	},
	onDayChange: function ()
	{
		// console.log("day = " + this.model.get('day'));
		// const stats = this.model.get('stats');
		// console.log("illMosquitoes = " + stats.illMosquitoes);
		// console.log("ill = " + stats.ill);
		// console.log("data.length = " + data.length);
		// this.myChart.data.datasets.forEach((dataset) => {
		// 	dataset.data.push(data[data.length - 1]);
		// });
		this.myChart.update();
	},

});
