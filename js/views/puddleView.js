const PuddleView = Backbone.View.extend({

	className: 'puddle',

	initialize ()
	{
		this.model.on('change:state', this.renderState, this);
		this.model.on('change:visible', this.renderVisible, this);
		return this;
	},

	render ()
	{
		const pos = this.model.get('pos');
		const left = pos.x;
		const top = pos.y;
		this.$el.css({left, top});
		this.renderState();
		this.renderVisible();
		return this;
	},
	renderState ()
	{
		const state = this.model.get('state');
		console.log("state", state);
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

});
