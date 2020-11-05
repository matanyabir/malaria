const HouseView = Backbone.View.extend({

	className: 'house map-item',
	initialize ()
	{
		this.model.on('change:spray', this.renderSpray, this);
		this.model.on('change:selected', this.renderSelected, this);
		return this;
	},
	events: {
		"click": "onClick",
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
		this.$spray.css({opacity: spray / 120});
	},
	renderSelected ()
	{
		if (this.model.get('selected')) {
			this.$el.addClass('selected');
		} else {
			this.$el.removeClass('selected');
		}
	},
	onClick ()
	{
		const mapModel = this.model.get('mapModel');
		mapModel.setSelected(this.model);
		return false;
	},
});
