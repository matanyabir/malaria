const SideBarView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .search-in": "searchInClick",
		"click .search-out": "searchOutClick",
		"click .s-puddle": "sprayPuddleClick",
		"click .s-house": "sprayHouseClick",
	},

	searchInCost () {
		const costsModel = this.model.get('costsModel');
		return costsModel.get('searchVillage');
	},

	searchOutCost () {
		const costsModel = this.model.get('costsModel');
		return costsModel.get('searchOut');
	},

	sprayPuddleCost () {
		const kpisModel = this.model.get('kpisModel');
		const costsModel = this.model.get('costsModel');
		return costsModel.get('sprayPuddle') * kpisModel.get('visiblePuddles');
	},

	sprayHouseCost () {
		const houses = this.model.get('houses');
		const costsModel = this.model.get('costsModel');
		return costsModel.get('sprayHouse') * houses.length;
	},

	initialize ()
	{
		this.$data = $('<div class="data-container container"></div>');
		this.$cash = $('<span class="kpi-txt"></span>');
		this.$pud = $('<span class="kpi-txt"></span>');
		this.$pop = $('<span class="kpi-txt"></span>');
		this.$ill = $('<span class="kpi-txt"></span>');
		this.$mos = $('<span class="kpi-txt"></span>');
		this.$illMos = $('<span class="kpi-txt"></span>');
		this.$data.append('<span class="kpi-img cash"></span>').append(this.$cash)
			.append('<span class="kpi-img pud"></span>').append(this.$pud)
			.append('<span class="kpi-img pop"></span>').append(this.$pop)
			.append('<span class="kpi-img ill"></span>').append(this.$ill)
			.append('<span class="kpi-img mos"></span>').append(this.$mos)
			.append('<span class="kpi-img ill-mos"></span>').append(this.$illMos);
		this.$actions = $('<div class="actions-container container"></div>');
		this.$searchInButton = $('<div class="action"><button class="search-puddles search-in"></button><span class="cost">' + Utils.numTxt(this.searchInCost())+'$</span></div>');
		this.$searchOutButton = $('<div class="action"><button class="search-puddles search-out"></button><span class="cost">' + Utils.numTxt(this.searchOutCost())+'$</span></div>');
		this.$sprayPuddleCost = $('<span class="cost"></span>');
		this.$sprayPuddleButton = $('<div class="action"><button class="spray s-puddle"></button></div>');
		this.$sprayPuddleButton.append(this.$sprayPuddleCost);
		this.$sprayHouseCost = $('<span class="cost"></span>');
		this.$sprayHouseButton = $('<div class="action"><button class="spray s-house"></button></div>');
		this.$sprayHouseButton.append(this.$sprayHouseCost);
		this.$actions.append(this.$searchInButton).append(this.$searchOutButton).append(this.$sprayPuddleButton).append(this.$sprayHouseButton);
		this.$el.append(this.$data).append(this.$actions);
		const kpisModel = this.model.get('kpisModel');
		kpisModel.on('change:visiblePuddles', this.onVisiblePuddlesChange, this);
		kpisModel.on('change:puddles', this.calcPud, this);
		kpisModel.on('change:population', this.calcPop, this);
		kpisModel.on('change:ill', this.calcIll, this);
		kpisModel.on('change:mosquitoes', this.calcMos, this);
		kpisModel.on('change:illMosquitoes', this.calcIllMos, this);
		this.model.on('change:cash', this.onCashChange, this);
		this.model.on('change:loading', this.onLoadingChange, this);
		return this;
	},

	render ()
	{
		this.calcPud();
		this.calcPop();
		this.calcIll();
		this.calcMos();
		this.calcIllMos();
		this.onCashChange();
		return this;
	},

	onLoadingChange ()
	{
		const loading = this.model.get('loading');
		if (loading) {
			this.$el.addClass('loading');
		} else {
			this.$el.removeClass('loading');
		}
	},
	calcPud ()
	{
		const kpisModel = this.model.get('kpisModel');
		const all = Utils.numTxt(kpisModel.get('puddles'));
		const visible = Utils.numTxt(kpisModel.get('visiblePuddles'));
		this.$pud.text(visible + " / " + all);
	},
	calcPop ()
	{
		const kpisModel = this.model.get('kpisModel');
		const count = Utils.numTxt(kpisModel.get('population'));
		this.$pop.text(count);
	},
	calcIll ()
	{
		const kpisModel = this.model.get('kpisModel');
		const count = kpisModel.get('ill');
		this.$ill.text(Utils.numTxt(count));
		if (count>20) // tbd rules
		{
			this.$ill.addClass('warning');
		} else {
			this.$ill.removeClass('warning');
		}
	},
	calcMos ()
	{
		const kpisModel = this.model.get('kpisModel');
		const count = kpisModel.get('mosquitoes');
		this.$mos.text(Utils.numTxt(count));
		if (count>22000) // tbd rules
		{
			this.$mos.addClass('warning');
		} else {
			this.$mos.removeClass('warning');
		}
	},
	calcIllMos ()
	{
		const kpisModel = this.model.get('kpisModel');
		const count = kpisModel.get('illMosquitoes');
		this.$illMos.text(Utils.numTxt(count));
		if (count>2000) // tbd rules
		{
			this.$illMos.addClass('warning');
		} else {
			this.$illMos.removeClass('warning');
		}
	},

	searchInClick ()
	{
		this.model.searchPuddles(this.searchInCost(), LOCATION.INSIDE_VILLAGE);
	},

	searchOutClick ()
	{
		this.model.searchPuddles(this.searchOutCost(), LOCATION.OUTSIDE_VILLAGE);
	},

	sprayPuddleClick ()
	{
		this.model.sprayPuddles(this.sprayPuddleCost());
	},

	sprayHouseClick ()
	{
		this.model.sprayHouses(this.sprayHouseCost());
	},

	onVisiblePuddlesChange ()
	{
		this.calcSprayPuddleCost();
		this.calcPud();
	},
	calcSprayPuddleCost ()
	{
		const cost = this.sprayPuddleCost();
		if (cost) {
			this.$sprayPuddleCost.text(Utils.numTxt(cost) + "$");
		} else {
			this.$sprayPuddleCost.text("N/A"); // no visible puddles...
		}
		const disable = !cost || this.model.get('cash') - cost < 0;
		if (disable) {
			this.$sprayPuddleButton.addClass('disabled');
		} else {
			this.$sprayPuddleButton.removeClass('disabled');
		}
	},
	calcSprayHouseCost ()
	{
		const cost = this.sprayHouseCost();
		this.$sprayHouseCost.text(Utils.numTxt(cost) + "$");
		const disable = this.model.get('cash') - cost < 0;
		if (disable) {
			this.$sprayHouseCost.addClass('disabled');
		} else {
			this.$sprayHouseCost.removeClass('disabled');
		}
	},
	calcSearchCost ()
	{
		const cash = this.model.get('cash');
		if (cash - this.searchInCost() < 0) {
			this.$searchInButton.addClass('disabled');
		} else {
			this.$searchInButton.removeClass('disabled');
		}
		if (cash - this.searchOutCost() < 0) {
			this.$searchOutButton.addClass('disabled');
		} else {
			this.$searchOutButton.removeClass('disabled');
		}
	},
	onCashChange ()
	{
		const cash = this.model.get('cash');
		this.$cash.text(Utils.numTxt(cash) + "$");

		this.calcSearchCost();
		this.calcSprayPuddleCost();
		this.calcSprayHouseCost();
	},

});
