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
		this.$img = $('<div class="big-img"><div class="p-s-img"></div><div class="p-w-img"></div><div class="h-img"></div></div>');
		this.$container = $('<div class="container"></div>');
		this.$title = $('<div class="selected-title"></div>');
		this.$idTitle = $('<div class="selected-sub-title"></div>');
		this.$sprayTitle = $('<div class="selected-sub-title"></div>');
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
		this.$container.append(this.$title)
			.append(this.$idTitle)
			.append(this.$sprayTitle)
			.append(this.$pudContainer)
			.append(this.$hosContainer);
		this.$el.append(this.$img).append(this.$container);
		this.model.on('change:cash', this.onCashChange, this);
		this.model.on('change:selectedItem', this.onSelectedChange, this);
		this.model.on('change:selectedId', this.onSelectedIdChange, this);
		this.model.on('change:selectedSpray', this.onSelectedSprayChange, this);
		this.model.on('change:selectedEggs', this.onSelectedEggsChange, this);
		this.model.on('change:selectedLars', this.onSelectedLavsChange, this);
		this.model.on('change:selectedPups', this.onSelectedPopsChange, this);
		return this;
	},

	onSelectedIdChange () {
		this.$idTitle.text('ID:' + this.model.get('selectedId'));
	},
	onSelectedSprayChange () {
		const selectedSpray = this.model.get('selectedSpray');
		if (selectedSpray) {
			this.$sprayTitle.text('Spray active for ' + selectedSpray + '  days more');
		} else {
			this.$sprayTitle.text('Not sprayed...');
		}
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
					this.$el.removeClass('weak-puddle').addClass('strong-puddle');
					this.$subTitle.text("Strong (cannot be destroyed)");
				} else {
					this.$el.addClass('weak-puddle').removeClass('strong-puddle');
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
			this.$sprayPuddleButton.addClass('disabled');
		} else {
			this.$sprayPuddleButton.removeClass('disabled');
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
