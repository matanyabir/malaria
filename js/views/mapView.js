const MapView = Backbone.View.extend({
	className: 'map',

	render: function ()
	{
		this.renderMap();
		this.renderHouses();
		this.renderPuddles();
		return this;
	},

	renderHouses: function ()
	{
		this.model.get('houses').each( model => {
			const view = new HouseView({model});
			this.$el.append(view.render().$el);
		});
	},

	renderPuddles: function ()
	{
		this.model.get('puddles').each( model => {
			const view = new PuddleView({model});
			this.$el.append(view.render().$el);
		});
	},

	renderMap: function ()
	{
		const {width, height} = this.model.get('size');
		this.$el.css({width, height});
	},
});
