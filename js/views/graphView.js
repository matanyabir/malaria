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
						label: "Mosquitoes counter",
						backgroundColor: "rgba(148,250,238,0.15)",
						hoverBackgroundColor: "rgba(97,247,250,0.2)",
						borderColor: "rgb(39,58,150)",
						hoverBorderColor: "rgb(12,5,150)",
						data: data
					}
				]
			}
		};
		const ctx = this.$canvas[0].getContext("2d");
		this.myChart = new Chart(ctx, lineChartData, {responsive: false});
		return this;
	},
	onDayChange: function ()
	{
		// console.log("day = " + this.model.get('day'));
		// const stats = this.model.get('stats');
		// const data = stats.mosquitoes;
		// console.log("data.length = " + data.length);
		// this.myChart.data.datasets.forEach((dataset) => {
		// 	dataset.data.push(data[data.length - 1]);
		// });
		this.myChart.update();
	},

});
