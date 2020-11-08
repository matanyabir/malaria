const GraphMapView = Backbone.View.extend({
	className: 'graph-v',
	initialize ()
	{
		// this.model.on('change:tabView', this.onTabViewChanged, this);
		return this;
	},
	// events: {
	// 	"click": "onClick",
	// },
	render: function ()
	{
		// this.$normalMap = $('<div class="normal-map-container"></div>');
		// this.$heatMap = $('<div class="heat-map-container"></div>');
		// this.$graph = $('<div class="graph-view-container"></div>');
		// this.$el.append(this.$normalMap)
		// 	.append(this.$heatMap)
		// 	.append(this.$graph);
		// this.renderPeriod();
		// this.renderMap();
		return this;
	},
	//
	// renderHouses: function ()
	// {
	// 	this.model.get('houses').each( model => {
	// 		const view = new HouseView({model});
	// 		this.$normalMap.append(view.render().$el);
	// 	});
	// },


});
