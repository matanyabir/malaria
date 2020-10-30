const SideBarView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .search-all": "searchAllClick"
	},

	searchAllCost () {
		return 4000;
	},

	initialize ()
	{

		this.$searchAllButton = $('<button class="search-all">Search (' + this.searchAllCost()+'$)</button>');
		this.$el.append(this.$searchAllButton);
		this.model.on('change:cash', this.onCashChange, this);
		return this;
	},

	render ()
	{
		this.onCashChange();
		return this;
	},

	searchAllClick ()
	{
		this.model.searchPuddles(this.searchAllCost());
	},

	onCashChange ()
	{
		const disable = this.model.get('cash') - this.searchAllCost() < 0;
		if (disable) {
			this.$searchAllButton.addClass('disabled');
		} else {
			this.$searchAllButton.removeClass('disabled');
		}
	},

});
