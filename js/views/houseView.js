const HouseView = Backbone.View.extend({

	className: 'house',
	initialize ()
	{
		this.model.on('change:spray', this.renderSpray, this);
		return this;
	},

	render ()
	{
		const pos = this.model.get('pos');
		const left = pos.x;
		const top = pos.y;
		this.$spray = $('<div class="spry"></div>');
		this.$el.css({left, top}).html(this.$spray);
		this.renderSpray();
		return this;
	},
	renderSpray ()
	{
		const spray = this.model.get('spray') || 0;
		this.$spray.css({opacity: spray / 7});
	},
});
