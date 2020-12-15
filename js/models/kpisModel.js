/**
 * KpisModel - the
 *
 * @author Matanya
 */
const KpisModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		population: 0, // current amount of humans
		infectedHuman: 0, // current amount of ill humans
		mosquitoes: 0, // current amount of mosquitoes
		infectiousMosquitoes: 0, // current amount of ill mosquitoes
		puddles: 0, // current amount of puddles that are relevant now
		visiblePuddles: 0, // current amount of puddles that are relevant now, and also founded
		habitatsLifeInfo: {} // map of count of eggs, lavraes, popaes per puddle id
	}

});
