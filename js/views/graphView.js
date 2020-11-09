const GraphMapView = Backbone.View.extend({
	className: 'graph-v',
	initialize ()
	{
		this.model.on('change:day', this.onDayChange, this);
		this.model.on('change:showLastYear', this.onShowLastYearChange, this);
		this.$canvasContainer = $('<div class="canvas-container"></div>');
		if (this.model.get('lastYear')) {
			this.$lastYearBtn = $('<button class="last-year" height="250" width="500"></button>');
			this.$el.html(this.$lastYearBtn);

		}
		this.$el.append(this.$canvasContainer);
		return this;
	},

	events: {
		"click .last-year": "onClickLastYear",
	}
	,
	render: function ()
	{
		const stats = this.model.get('stats');
		const showLastYear = this.model.get('showLastYear');
		const lastYear = this.model.get('lastYear');
		let time = new Date(this.model.get('time').start).getTime();
		let arr;
		// we assume that we have all kpis, so we choose arbitrary the "ill" just for the count...
		if (showLastYear) {
			arr = lastYear.ill;
		} else {
			arr = stats.ill;
		}
		const labels = arr.map((x, i) => {
			const date = new Date(time + i * 24 * 60 * 60 * 1000);
			const dateStr = `${date.getDate()}.${1+date.getMonth()}`;
			return dateStr
		});
		const lineChartData = {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: "Mosquitoes",
						fill: false,
						pointHoverRadius: 10,
						borderColor: "rgb(39,58,150)",
						hoverBorderColor: "rgb(12,5,150)",
						data: stats.mosquitoes
					},
					{
						label: "Infectious Mosquitoes",
						fill: false,
						pointHoverRadius: 10,
						borderColor: "rgb(150,43,139)",
						hoverBorderColor: "rgb(150,10,133)",
						data: stats.illMosquitoes
					},
					{
						label: "Ill People",
						fill: false,
						pointHoverRadius: 10,
						borderColor: "rgb(33,150,55)",
						hoverBorderColor: "rgb(0,150,33)",
						data: stats.ill
					},
				]
			},
			options: {
				responsive: false,
			}
		};
		if (showLastYear) {
			lineChartData.data.datasets.push(
				{
					label: "Last Year Mosquitoes",
					fill: false,
					pointHoverRadius: 10,
					borderColor: "rgb(105,156,250)",
					hoverBorderColor: "rgb(66,133,250)",
					data: lastYear.mosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					label: "Last Year Infectious Mosquitoes",
					fill: false,
					pointHoverRadius: 10,
					borderColor: "rgb(250,91,208)",
					hoverBorderColor: "rgb(250,5,190)",
					data: lastYear.illMosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					label: "Last year Ill People",
					fill: false,
					pointHoverRadius: 10,
					borderColor: "rgb(62,212,95)",
					hoverBorderColor: "rgb(0,212,60)",
					data: lastYear.ill
				}
			);
		}
		const $canvas = $('<canvas class="graphs-canvas" height="500" width="1000"></canvas>');
		this.$canvasContainer.html($canvas);

		const ctx = $canvas[0].getContext("2d");
		this.myChart = new Chart(ctx, lineChartData, {});
		return this;
	},
	onDayChange: function ()
	{
		if (!this.model.get('showLastYear')) {
			const time = new Date(this.model.get('time').start).getTime();
			const day = this.model.get('day');
			const date = new Date(time + day * 24 * 60 * 60 * 1000);
			const label = `${date.getDate()}.${1+date.getMonth()}`;

			// we need to add "today" label:
			this.myChart.data.labels.push(label);
		}
		this.myChart.update();
	},
	onClickLastYear: function ()
	{
		this.model.set('showLastYear', !this.model.get('showLastYear'));
	},
	onShowLastYearChange: function ()
	{
		if (this.model.get('showLastYear')) {
			this.$lastYearBtn.addClass('selected');
		} else {
			this.$lastYearBtn.removeClass('selected');
		}
		// this.myChart.clear();
		this.render();
	},

});
