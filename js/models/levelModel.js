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
		id: null, // the "level class" id, the server can create  "instance" for this level
		map: null // after we have the "level instance" we will create the MapModel for it
	}

	/**
	* get all the data from the service.
	*/
	,loadData ()
	{
		Service.startLevel(this.get("id"), (data) => {
			const map = new MapModel({});
			map.buildFromJson(data);
			this.set({map});
		});
	}
});
