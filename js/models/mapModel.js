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
	}

	/**
	 * recursively init all the items from JSON
	 * @param data: the {items, name, isCollapse, lock} JSON
	*/
	,buildFromJson (data)
	{
		const {size, time, cash, kpis, id} = data;
		// const mosquitoes = new MosquitoesCollection;
		const houses = new HousesCollection;
		// const humans = new HumansCollection;
		const puddles = new PuddlesCollection;
		// if (data.mosquitoes) {
		// 	data.mosquitoes.forEach((item) => {
		// 		const model = new MosquitoModel(item);
		// 		mosquitoes.add(model);
		// 	});
		// }
		if (data.houses) {
			data.houses.forEach((item) => {
				const model = new HouseModel(item);
				houses.add(model);
			});
		}
		// if (data.humans) {
		// 	data.humans.forEach((item) => {
		// 		const model = new HumanModel(item);
		// 		humans.add(model);
		// 	});
		// }
		if (data.puddles) {
			data.puddles.forEach((item) => {
				// item.periodIndex = 0;
				const model = new PuddleModel(item);
				model.set("periodIndex", 0);
				puddles.add(model);
			});
		}
		const kpisModel = new KpisModel(kpis);
		// this.set({size, time, cash, mosquitoes, houses, humans, puddles, kpisModel, id});
		this.set({size, time, cash, houses, puddles, kpisModel, id});
		this.updatePuddlesCount();
		return this;
	}

	// /**
	//  * get curr state JSON
	// */
	// ,getJson ()
	// {
	// 	return {tbd};
	// }

	,incDay (cb)
	{
		if (this.get('end')) {
			return;
		}
		this.set('loading', true);
		Service.incDay(this.get('id'), (kpis)=> {
			this.set('loading', false);
			const kpisModel = this.get('kpisModel');
			kpisModel.set(kpis);
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
				kpisModel.set('visiblePuddles', 0);
				// this.get('puddles').each( model => model.set({periodIndex}));
				this.get('puddles').each( model => model.set({periodIndex}));
				this.set({periodIndex});
				this.updatePuddlesCount();
			}
			this.get('puddles').each( model => model.dayPass());
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
	,searchPuddles (cost)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		let puddlesFound = 0;
		this.get('puddles').each( model => {
			const isFound = model.found();
			if (isFound) {
				puddlesFound++;
			}
		});
		if (puddlesFound) {
			const kpisModel = this.get('kpisModel');
			const visiblePuddles = kpisModel.get('visiblePuddles') + puddlesFound;
			kpisModel.set({visiblePuddles});
		}
	}
	,spray (cost)
	{
		const cash = this.get('cash') - cost;
		this.set({cash});
		this.get('puddles').each( model => {
			if (model.get('visible')) {
				model.spray();
			}
		});
		console.log("TBD call service...");
	}
	,updatePuddlesCount ()
	{
		let puddles = 0;
		this.get('puddles').each( model => {
			if (model.get('state') !== PUDDLE_STATE.EMPTY) {
				puddles++;
			}
		});
		const kpisModel = this.get('kpisModel');
		kpisModel.set({puddles});
	}

});
