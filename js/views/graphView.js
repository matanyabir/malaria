const GraphMapView = Backbone.View.extend({
	className: 'graph-v',
	initialize ()
	{
		this.spryImage = new Image(20, 20);
		this.dryImage = new Image(20, 20);
		// this.spryImage.onload = function() {
		// 	alert('image loaded');
		// };
		// this.spryImage.onerror = function() {
		// 	alert('image error3');
		// };
		// TBD: better path...
		this.spryImage.src = "/malaria2/svgs/all/spray-bottle.svg";
		this.dryImage.src = "/malaria2/svgs/all/hoe.svg";
		this.model.on('change:day', this.onDayChange, this);
		this.model.on('change:showLastYear', this.onShowLastYearChange, this);
		this.$canvasContainer = $('<div class="canvas-container"></div>');
		if (this.model.get('lastYear')) {
			this.$lastYearBtn = $(`<button class="last-year hint--bottom-right" aria-label="${TEXTS.graph.lastYear}" height="250" width="500"></button>`);
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
		// we assume that we have all kpis, so we choose arbitrary the "infectedHuman" just for the count...
		if (showLastYear) {
			arr = lastYear.infectedHuman;
		} else {
			arr = stats.infectedHuman;
		}
		const labels = arr.map((x, i) => {
			const date = new Date(time + i * 24 * 60 * 60 * 1000);
			return Utils.getDateStr(date);
		});
		const lineChartData = {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						yAxisID: "m",
						label: TEXTS.terms.mosquitoes,
						fill: false,
						pointHoverRadius: 10,
						backgroundColor: "rgb(107,120,188)",
						borderColor: "rgb(39,58,150)",
						hoverBorderColor: "rgb(12,5,150)",
						data: stats.mosquitoes
					},
					{
						yAxisID: "m",
						label: TEXTS.terms.infectiousMosquitoes,
						fill: false,
						hidden: true, // starts as hidden by default
						pointHoverRadius: 10,
						backgroundColor: "rgb(173,131,183)",
						borderColor: "rgb(150,43,139)",
						hoverBorderColor: "rgb(150,10,133)",
						data: stats.infectiousMosquitoes
					},
					{
						yAxisID: "p",
						label: TEXTS.terms.illPeople,
						fill: false,
						pointHoverRadius: 10,
						backgroundColor: "rgb(116,189,134)",
						borderColor: "rgb(33,150,55)",
						hoverBorderColor: "rgb(0,150,33)",
						data: stats.infectedHuman
					},
					{
						yAxisID: "s",
						label: TEXTS.terms.sprayedHouses,
						pointStyle: this.spryImage,
						// pointStyle: 'star',
						pointRadius: 15,
						fill: false,
						hidden: true, // starts as hidden by default
						showLine: false,
						pointHoverRadius: 20,
						borderColor: "rgb(247,244,103)",
						backgroundColor: "rgb(247,244,103)",
						data: stats.sprayHos
					},
					{
						yAxisID: "s",
						label: TEXTS.terms.sprayedPuddles,
						pointStyle: this.spryImage,
						// pointStyle: 'star',
						pointRadius: 15,
						fill: false,
						hidden: true, // starts as hidden by default
						showLine: false,
						pointHoverRadius: 20,
						borderColor: "rgb(247,244,103)",
						backgroundColor: "rgb(247,244,103)",
						data: stats.sprayPud
					},
					{
						yAxisID: "d",
						label: TEXTS.terms.dryedPuddles,
						pointStyle: this.dryImage,
						pointRadius: 15,
						fill: false,
						hidden: true, // starts as hidden by default
						showLine: false,
						pointHoverRadius: 20,
						borderColor: "rgb(102,27,35)",
						backgroundColor: "rgb(102,27,35)",
						data: stats.dryPud
					},
				]
			},
			options: {
				responsive: false,
				scales: {
					yAxes: [{
						type: 'linear',
						display: true,
						position: 'left',
						id: 'm', // mosquitoes
					}, {
						type: 'linear',
						display: true,
						position: 'right',
						id: 'p', // people
						// grid line settings
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
						},
					}, {
						type: 'linear',
						display: false,
						id: 's', // spray action
					}, {
						type: 'linear',
						display: false,
						id: 'd', // dry action
					}],
				}
			}
		};
		if (showLastYear) {
			lineChartData.data.datasets.push(
				{
					yAxisID: "m",
					label: TEXTS.terms.mosquitoesLY,
					fill: false,
					pointHoverRadius: 10,
					backgroundColor: "rgb(108,223,250)",
					borderColor: "rgb(105,156,250)",
					hoverBorderColor: "rgb(66,133,250)",
					data: lastYear.mosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					yAxisID: "m",
					label: TEXTS.terms.infectiousMosquitoesLY,
					fill: false,
					pointHoverRadius: 10,
					hidden: true, // starts as hidden by default
					backgroundColor: "rgb(239,160,250)",
					borderColor: "rgb(210,103,250)",
					hoverBorderColor: "rgb(209,72,250)",
					data: lastYear.infectiousMosquitoes
				}
			);
			lineChartData.data.datasets.push(
				{
					yAxisID: "p",
					label: TEXTS.terms.illPeopleLY,
					fill: false,
					pointHoverRadius: 10,
					backgroundColor: "rgb(159,234,153)",
					borderColor: "rgb(62,212,95)",
					hoverBorderColor: "rgb(0,212,60)",
					data: lastYear.infectedHuman
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
			const label = Utils.getDateStr(date);

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
