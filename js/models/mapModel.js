/**
 * MapModel - the
 *
 * @author Matanya
 */
const MapModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		// TBD: make small models, e.g.: TimeModel, RulesModel, etc.?
		id: 0, // the id of the level
		day: 0, // current day
		periodIndex: 0, // current index of period in time.periods array
		cash: 0, // current cash
		mosquitoes: 0, // array of mosquitoes' positions
		tabView: TABS_VIEWS.NORMAL_MAP, // the selected view
		stats: {}, // all kpis until today
	}

	/**
	 * recursively init all the items from JSON
	 * @param data: the {items, name, isCollapse, lock} JSON
	*/
	,buildFromJson (data)
	{
		const {size, time, cash, kpis, costs, id, lastYear} = data;
		const houses = new HousesCollection;
		const puddles = new PuddlesCollection;
		if (data.houses) {
			data.houses.forEach((item) => {
				const model = new HouseModel(item);
				model.set('mapModel', this);
				houses.add(model);
			});
		}
		if (data.puddles) {
			data.puddles.forEach((item) => {
				// item.periodIndex = 0;
				const model = new PuddleModel(item);
				model.set('mapModel', this);
				model.set("periodIndex", 0);
				puddles.add(model);
			});
		}
		const kpisModel = new KpisModel(kpis);
		const costsModel = new KpisModel(costs);
		this.set({size, time, cash, houses, puddles, kpisModel, costsModel, id, lastYear});
		this.updatePuddlesCount();
		this.addToStats(kpis);
		return this;
	}

	,incDay (cb)
	{
		if (this.get('end')) {
			return;
		}
		this.set('loading', true);
		const getMosquitoes = this.get('tabView') === TABS_VIEWS.HEAT_MAP;
		Service.incDay(this.get('id'), getMosquitoes, ({kpis, mosquitoes})=> {
			this.set('loading', false);
			this.addToStats(kpis);
			this.set('mosquitoes', mosquitoes);
			const kpisModel = this.get('kpisModel');
			kpisModel.set(kpis);
			this.updateSelectedKpis();
			let day = this.get('day') + 1;
			this.set({day});
			const {periods} = this.get('time');
			let periodIndex = 0;
			while (periodIndex < periods.length) {
				const {duration} = periods[periodIndex];
				if (day < duration) {
					// we are in the middle of "periodIndex" period
					break;
				}
				day -= duration;
				periodIndex++;
			}
			if (periodIndex === periods.length){
				//TBD level end...
				this.set('end', true);
				return;
			}
			if (this.get('periodIndex') !== periodIndex) {
				this.get('puddles').each( model => model.set({periodIndex}));
				this.set({periodIndex});
				this.updatePuddlesCount();
			}
			this.get('puddles').each( model => model.dayPass());
			this.get('houses').each( model => model.dayPass());
			if (cb) {
				cb();
			}

		});
	}
	,addToStats (kpis)
	{
		const stats = this.get('stats');
		_.forEach(kpis, (val, key) => {
			if (stats[key]) {
				stats[key].push(val);
			} else {
				stats[key] = [val];
			}
		});
	}
	,loadMosquitoes (cb)
	{
		if (this.get('end')) {
			return;
		}
		this.set('loading', true);
		Service.getMosquitoes(this.get('id'), (mosquitoes)=> {
			this.set('loading', false);
			this.set('mosquitoes', mosquitoes);
			if (cb) {
				cb();
			}
		});
	}

	,getCurrPeriod ()
	{
	    const {periods} = this.get('time');
	    const periodIndex = this.get('periodIndex');
	    return periods[periodIndex];
	}
	,searchPuddles (cost, loc, isSatellite)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		let puddlesFound = 0;
		this.get('puddles').each( model => {
			if (model.get('loc') === loc) {
				const isFound = model.found(isSatellite);
				if (isFound) {
					puddlesFound++;
				}
			}
		});
		if (puddlesFound) {
			const kpisModel = this.get('kpisModel');
			const visiblePuddles = kpisModel.get('visiblePuddles') + puddlesFound;
			kpisModel.set({visiblePuddles});
		}
	}
	,sprayPuddles (cost)
	{
		const cash = this.get('cash') - cost;
		const puddlesIds = [];
		this.set({cash});
		this.get('puddles').each( model => {
			if (model.get('visible')) {
				puddlesIds.push(model.get('id'));
				model.spray();
			}
		});
		this.set('loading', true);
		Service.sprayPuddles(this.get('id'), puddlesIds, (kpis)=> {
			this.set('loading', false);
		});
	}
	,dryPuddle (cost, model)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		// const puddles = this.get('puddles');
		// puddles.remove(model);
		this.set('selectedItem', null);
		model.destroy();
		// model.trigger('destroy', model, model.collection, {});
		const kpisModel = this.get('kpisModel');
		const puddles = kpisModel.get('puddles') - 1;
		const visiblePuddles = kpisModel.get('visiblePuddles') - 1;
		kpisModel.set({puddles, visiblePuddles});

		this.set('loading', true);
		Service.dryPuddles(this.get('id'), [model.get('id')], (kpis)=> {
			this.set('loading', false);
		});
	}
	,sprayPuddle (cost, model)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		model.spray();
		this.set('selectedSpray', model.get('spray'));
		this.set('loading', true);
		Service.sprayPuddles(this.get('id'), [model.get('id')], (kpis)=> {
			this.set('loading', false);
		});
	}
	,sprayHouses (cost)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		this.get('houses').each( model => {
			model.spray();
		});
		this.set('loading', true);
		Service.sprayHouses(this.get('id'), "all", (kpis)=> {
			this.set('loading', false);
		});
	}
	,sprayHouse (cost, model)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		model.spray();
		this.set('selectedSpray', model.get('spray'));
		this.set('loading', true);
		Service.sprayHouses(this.get('id'), [model.get('id')], (kpis)=> {
			this.set('loading', false);
		});
	}
	,setSelected (selectedItem)
	{
		const prevSelected = this.get('selectedItem');
		if (prevSelected) {
			prevSelected.set('selected', false);
		}
		if (selectedItem) {
			selectedItem.set('selected', true);
		}
		this.set({selectedItem});
		this.updateSelectedKpis();
	}
	,updateSelectedKpis ()
	{
		const selectedItem = this.get('selectedItem');
		if (selectedItem) {
			this.set('selectedId', selectedItem.get('id'));
			this.set('selectedSpray', selectedItem.get('spray'));
			if (selectedItem.elementType === 'puddle') {
				const kpisModel = this.get('kpisModel');
				const p = kpisModel.get('puddlesMap')[selectedItem.get('id')];
				this.set('selectedEggs', p.e || 0);
				this.set('selectedLars', p.l || 0);
				this.set('selectedPups', p.p || 0);
			}
		}
	}
	,updatePuddlesCount ()
	{
		let puddles = 0;
		let visiblePuddles = 0;
		this.get('puddles').each( model => {
			if (model.get('state') !== PUDDLE_STATE.EMPTY) {
				puddles++;
				if (model.get('visible')) {
					visiblePuddles++;
				}
			}
		});
		const kpisModel = this.get('kpisModel');

		kpisModel.set({puddles, visiblePuddles});
	}

});
