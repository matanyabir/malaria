/**
 * LevelModel - the main model of the level.
 *
 * @author Matanya
 */
const LevelModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		map: null //
		// ,dataStatus: DATA_STATUS.NO_DATA // the status of the data
	}

	/**
	* get all the data from the service.
	*/
	,loadData ()
	{
		const map = new MapModel({});
		map.buildFromJson(EXAMPLE_LEVEL);
		this.set({map});
		// this.set({dataStatus: DATA_STATUS.LOADING});
		// Service.getData((data)=> {
		// 	if (data.tree) {
		// 		const tree = new CategoryModel({});
		// 		tree.buildFromJson(data.tree);
		// 		this.set({
		// 			dataStatus: DATA_STATUS.GET_SUCCESS,
		// 			tree
		// 		});
		// 	}
		// 	else {
		// 		this.set({
		// 			dataStatus: DATA_STATUS.NO_DATA,
		// 			tree: this._getEmptyTree()
		// 		});
		// 	}
		// }, ()=> {
		// 	this.set({
		// 		dataStatus: DATA_STATUS.FAIL,
		// 		tree: this._getEmptyTree()
		// 	});
		// });
	}
});
