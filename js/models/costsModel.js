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
		searchVillageSatellite: 5, // cost of search puddles inside the village with satellite
		searchOutSatellite: 25, // cost of search puddles outside the village with satellite
		searchVillage: 50, // cost of search puddles inside the village
		searchOut: 250, // cost of search puddles outside the village
		sprayHouse: 30, // cost of spray 1 house
		sprayPuddle: 1, // cost of spray 1 puddle
		dryPuddle: 20, // cost of destroy 1 puddle
	}

});
