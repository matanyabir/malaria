const MapView = Backbone.View.extend({
	className: 'main-view',
	initialize ()
	{
		this.model.on('change:periodIndex', this.renderPeriod, this);
		this.model.on('change:tabView', this.onTabViewChanged, this);
		return this;
	},
	events: {
		"click .map-container": "onClick",
	},
	render: function ()
	{
		this.$mapContainer = $('<div class="map-container"></div>');
		this.$bigMap = $('<div class="big-map"></div>');
		this.$heatMap = $('<div class="heat-map-container"></div>');
		this.$mapItems = $('<div class="map-items-container"></div>');
		this.$graph = $('<div class="graph-view-container"></div>');
		this.$mapContainer.append(this.$bigMap);
		this.$bigMap.append(this.$mapItems)
			.append(this.$heatMap);
		this.$el.append(this.$mapContainer)
			.append(this.$graph);
		this.renderPeriod();
		this.renderMap();
		this.renderHouses();
		this.renderPuddles();
		return this;
	},

	closeGraphView ()
	{
		this.$graph.removeClass('selected');
		if (this.graphView) {
			const graphView = this.graphView;
			this.graphView = null;
			setTimeout(()=> graphView.remove(), 500);
		}
	},
	createGraphView ()
	{
		this.$graph.addClass('selected');
		this.graphView = new GraphMapView({model: this.model});
		this.$graph.html(this.graphView.render().$el);
	},
	closeHeatMap ()
	{
		this.$heatMap.removeClass('selected');
		if (this.heatMapView) {
			this.heatMapView.remove();
			// const heatMapView = this.heatMapView;
			// this.heatMapView = null;
			// setTimeout(()=> heatMapView.remove(), 500);
		}
	},
	createHeatMap ()
	{
		this.$heatMap.addClass('selected');
		this.heatMapView = new HeatMapView({model: this.model});
		this.$heatMap.html(this.heatMapView.render().$el);
	},

	onTabViewChanged ()
	{
		switch(this.model.get('tabView')) {
			case TABS_VIEWS.HEAT_MAP:
				this.closeGraphView();
				this.createHeatMap();
				break;
			case TABS_VIEWS.NORMAL_MAP:
				this.closeGraphView();
				this.closeHeatMap();
				break;
			case TABS_VIEWS.GRAPH_VIEW:
				this.closeHeatMap();
				this.createGraphView();
		}
	},

	renderPeriod ()
	{
		const period = this.model.getCurrPeriod();
		if (!period) {
			this.$el.html('TBD. Level ended.');
			return;
		}
		if (period.climate === PERIOD_TYPE.DRY) {
			this.$bigMap.addClass('dry-period');
		} else {
			this.$bigMap.removeClass('dry-period');
		}
	},

	renderHouses: function ()
	{
		this.model.get('houses').each( model => {
			const view = new HouseView({model});
			this.$mapItems.append(view.render().$el);
		});
	},

	renderPuddles: function ()
	{
		this.model.get('puddles').each( model => {
			const view = new PuddleView({model});
			this.$mapItems.append(view.render().$el);
		});
	},

	renderMap: function ()
	{
		const {width, height} = this.model.get('size');
		this.$bigMap.css({width, height});
	},
	onClick ()
	{
		this.model.setSelected(null);
	},

});
