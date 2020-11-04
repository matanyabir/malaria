const PuddleView = Backbone.View.extend({

	className: 'puddle',

	events: {
		"click": "onClick",
	},

	initialize ()
	{
		this.model.on('change:state', this.renderState, this);
		this.model.on('change:spray', this.renderSpray, this);
		this.model.on('change:visible', this.renderVisible, this);
		this.model.on('change:selected', this.renderSelected, this);
		return this;
	},

	render ()
	{
		const pos = this.model.get('pos');
		const left = pos.x;
		const top = pos.y;
		this.$spray = $('<div class="spry"></div>');
		this.$el.css({left, top}).html(this.$spray);
		this.renderState();
		this.renderVisible();
		this.renderSpray();
		return this;
	},
	renderState ()
	{
		const state = this.model.get('state');
		this.$el.attr("data-state", state);
	},
	renderVisible ()
	{
		const visible = this.model.get('visible');
		if (visible) {
			this.$el.show();
		} else {
			this.$el.hide();
		}
	},
	renderSpray ()
	{
		const spray = this.model.get('spray') || 0;
		this.$spray.css({opacity: spray / 7});
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
