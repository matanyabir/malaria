const MapView = Backbone.View.extend({
	className: 'map',
	initialize ()
	{
		this.model.on('change:periodIndex', this.renderPeriod, this);
		return this;
	},
	render: function ()
	{
		this.renderPeriod();
		this.renderMap();
		this.renderHouses();
		this.renderPuddles();
		return this;
	},

	renderPeriod ()
	{
		const period = this.model.getCurrPeriod();
		if (!period) {
			this.$el.html('TBD. Level ended.');
			return;
		}
		if (period.type === PERIOD_TYPE.HOT) {
			this.$el.addClass('hot-period');
		} else {
			this.$el.removeClass('hot-period');
		}
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
