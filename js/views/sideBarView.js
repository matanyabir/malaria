const SideBarView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .search-all": "searchAllClick",
		"click .spray": "sprayClick",
	},

	searchAllCost () {
		//TBD use "rules"
		return 4000;
	},

	sprayCost () {
		//TBD use "rules"
		const kpisModel = this.model.get('kpisModel');
		return 100 * kpisModel.get('visiblePuddles');
	},

	initialize ()
	{
		this.$data = $('<div class="data-container container"></div>');
		this.$actions = $('<div class="actions-container container"></div>');
		this.$searchAllButton = $('<div class="action"><button class="search-all"></button><span class="cost">' + this.searchAllCost()+'$</span></div>');
		this.$sprayCost = $('<span class="cost"></span>');
		this.$sprayButton = $('<div class="action"><button class="spray"></button></div>');
		this.$sprayButton.append(this.$sprayCost);
		this.$actions.append(this.$searchAllButton).append(this.$sprayButton);
		this.$el.append(this.$data).append(this.$actions);
		const kpisModel = this.model.get('kpisModel');
		kpisModel.on('change:visiblePuddles', this.onVisiblePuddlesChange, this);
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

	sprayClick ()
	{
		this.model.spray(this.calcSprayCost());
	},

	onVisiblePuddlesChange ()
	{
		this.calcSprayCost();
	},
	calcSprayCost ()
	{
		const cost = this.sprayCost();
		if (cost) {
			this.$sprayCost.text(cost + "$");
		} else {
			this.$sprayCost.text("No visible puddles...");
		}
		const disable = !cost || this.model.get('cash') - cost < 0;
		if (disable) {
			this.$sprayButton.addClass('disabled');
		} else {
			this.$sprayButton.removeClass('disabled');
		}
	},
	calcSearchCost ()
	{
		const disable = this.model.get('cash') - this.searchAllCost() < 0;
		if (disable) {
			this.$searchAllButton.addClass('disabled');
		} else {
			this.$searchAllButton.removeClass('disabled');
		}
	},
	onCashChange ()
	{
		this.calcSearchCost();
		this.calcSprayCost();
	},

});
