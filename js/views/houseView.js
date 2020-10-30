const HouseView = Backbone.View.extend({

	className: 'house',

	render ()
	{
		const pos = this.model.get('pos');
		const left = pos.x;
		const top = pos.y;
		this.$el.css({left, top});
		return this;
	},

});
