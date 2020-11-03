/**
 * CostsModel - the
 *
 * @author Matanya
 */
const CostsModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		searchVillage: 1000, // cost of search puddles inside the village
		searchOut: 2500, // cost of search puddles outside the village
		sprayHouse: 10, // cost of spray 1 house
		sprayPuddle: 20, // cost of spray 1 puddle
		dryPuddle: 200, // cost of destroy 1 puddle
	}

});
