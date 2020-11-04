const SelectedPanelView = Backbone.View.extend(
{
	className: 'selected-panel',

	events: {
		"click .spray-puddle": "sprayPuddleClick",
		"click .spray-house": "sprayHouseClick",
	},

	sprayPuddleCost () {
		const costsModel = this.model.get('costsModel');
		return costsModel.get('sprayPuddle');
	},

	sprayHouseCost () {
		const costsModel = this.model.get('costsModel');
		return costsModel.get('sprayHouse');
	},

	initialize ()
	{
		this.$img = $('<div class="big-img"><div class="p-img"></div><div class="h-img"></div></div>');
		this.$title = $('<div class="selected-title"></div>');
		this.$subTitle = $('<div class="selected-sub-title"></div>');
		this.$sprayPuddleButton = $('<div class="action"><button class="spray-puddle spray-item"></button><span class="cost">' + Utils.numTxt(this.sprayPuddleCost())+'$</span></div>');
		this.$sprayHouseButton = $('<div class="action"><button class="spray-house spray-item"></button><span class="cost">' + Utils.numTxt(this.sprayHouseCost())+'$</span></div>');
		this.$pudContainer = $('<div class="pud-container"></div>');
		this.$hosContainer = $('<div class="hos-container"></div>').append(this.$sprayHouseButton);
		this.$egg = $('<span class="kpi-txt"></span>');
		this.$pup = $('<span class="kpi-txt"></span>');
		this.$lar = $('<span class="kpi-txt"></span>');
		this.$pudContainer.append(this.$subTitle)
			.append('<span class="kpi-img egg"></span>').append(this.$egg)
			.append('<span class="kpi-img pup"></span>').append(this.$pup)
			.append('<span class="kpi-img lar"></span>').append(this.$lar)
			.append(this.$sprayPuddleButton);
		this.$el.append(this.$img).append(this.$title).append(this.$pudContainer).append(this.$hosContainer);
		this.model.on('change:cash', this.onCashChange, this);
		this.model.on('change:selectedItem', this.onSelectedChange, this);
		this.model.on('change:selectedEggs', this.onSelectedEggsChange, this);
		this.model.on('change:selectedLars', this.onSelectedLavsChange, this);
		this.model.on('change:selectedPups', this.onSelectedPopsChange, this);
		return this;
	},

	onSelectedEggsChange () {
		this.$egg.text(this.model.get('selectedEggs'));
	},
	onSelectedLavsChange () {
		this.$lar.text(this.model.get('selectedLars'));
	},
	onSelectedPopsChange () {
		this.$pup.text(this.model.get('selectedPups'));
	},

	// render ()
	// {
	// 	return this;
	// },

	onSelectedChange ()
	{
		const selectedItem = this.model.get('selectedItem');
		if (selectedItem) {
			this.$el.addClass('show-selected');
			if (selectedItem.elementType === 'house') {
				this.$el.removeClass('selected-puddle').addClass('selected-house');
				this.$title.text('House');
			} else {
				this.$el.addClass('selected-puddle').removeClass('selected-house');
				if (selectedItem.get('states')) {
					this.$title.text('Seasonal Puddle');
				} else {
					this.$title.text('Permanent Puddle');
				}
				if (selectedItem.get('state') === PUDDLE_STATE.STRONG) {
					this.$subTitle.text("Strong (cannot be destroyed)");
				} else {
					this.$subTitle.text("Weak (can be destroyed)");
				}
			}
		} else {
			this.$el.removeClass('show-selected');
		}
	},

	sprayPuddleClick ()
	{
		this.model.sprayPuddle(this.sprayPuddleCost(), this.model.get('selectedItem'));
	},

	sprayHouseClick ()
	{
		this.model.sprayHouse(this.sprayHouseCost(), this.model.get('selectedItem'));
	},

	calcDisableCost ()
	{
		const cash = this.model.get('cash');
		if (cash - this.sprayPuddleCost() < 0) {
			this.$sprayHouseButton.addClass('disabled');
		} else {
			this.$sprayHouseButton.removeClass('disabled');
		}
		if (cash - this.sprayHouseCost() < 0) {
			this.$sprayHouseButton.addClass('disabled');
		} else {
			this.$sprayHouseButton.removeClass('disabled');
		}
	},
	onCashChange ()
	{
		this.calcDisableCost();
	},

});
