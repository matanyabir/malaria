const LevelView = Backbone.View.extend({
	initialize ()
	{
		this.model.on('change:map', this.renderLevelMap, this);
		return this;
	},
	render: function ()
	{
		// this.$topPanel = $('<div id="top-panel" class="container1"></div>');
		// this.$map = $('<div id="map-container" class="container1"></div>');
		// this.$sideBar = $('<div id="side-bar" class="container1"></div>');
		//
		// this.$el.append(this.$topPanel).append(this.$map).append(this.$sideBar);
		this.$el.html('Loading...');
		return this;
	},

	renderLevelMap ()
	{
		this.$topPanel = $('<div id="top-panel" class="container1"></div>');
		this.$map = $('<div id="map-container" class="container1"></div>');
		this.$sideBar = $('<div id="side-bar" class="container1"></div>');
		this.$el.html(this.$topPanel).append(this.$map).append(this.$sideBar);

		const model = this.model.get("map");
		const panelView = new TopPanelView({model: model});
		const sideBarView = new SideBarView({model: model});
		const mapView = new MapView({model: model});
		this.$topPanel.html(panelView.render().$el);
		this.$sideBar.html(sideBarView.render().$el);
		this.$map.html(mapView.render().$el);
	},
});
