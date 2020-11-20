const TabsView = Backbone.View.extend(
{
	className: 'tabs-view',
	tagName: 'ul',

	events: {
		"click .heat-map": "heatMapClick",
		"click .normal-map": "normalMapClick",
		"click .graph-view": "graphViewClick",
  	},

	initialize ()
	{

		this.$heatMap = $(`<li class="heat-map disable-on-loading hint--bottom-right" aria-label="${TEXTS.topPanel.heatMap}"></li>`);
		this.$noramlMap = $(`<li class="normal-map disable-on-loading hint--bottom" aria-label="${TEXTS.topPanel.normalMap}"></li>`);
		this.$graphView = $(`<li class="graph-view disable-on-loading hint--bottom-left" aria-label="${TEXTS.topPanel.graph}"></li>`);
		this.$el
			.append(this.$heatMap)
			.append(this.$noramlMap)
			.append(this.$graphView);
		this.model.on('change:tabView', this.render, this);
		return this;
	},

	render ()
	{
		this.$heatMap.removeClass('selected');
		this.$noramlMap.removeClass('selected');
		this.$graphView.removeClass('selected');
		switch(this.model.get('tabView')) {
			case TABS_VIEWS.HEAT_MAP:
				this.$heatMap.addClass('selected');
				break;
			case TABS_VIEWS.NORMAL_MAP:
				this.$noramlMap.addClass('selected');
				break;
			case TABS_VIEWS.GRAPH_VIEW:
				this.$graphView.addClass('selected');
		}
		return this;
	},

	heatMapClick ()
	{
		this.model.set('tabView', TABS_VIEWS.HEAT_MAP);
	},

	normalMapClick ()
	{
		this.model.set('tabView', TABS_VIEWS.NORMAL_MAP);
	},

	graphViewClick ()
	{
		this.model.set('tabView', TABS_VIEWS.GRAPH_VIEW);
		this.model.set('selectedItem', null);
	},


});
