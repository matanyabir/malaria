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
		ill: 0, // current amount of ill humans
		mosquitoes: 0, // current amount of mosquitoes
		illMosquitoes: 0, // current amount of ill mosquitoes
		puddles: 0, // current amount of puddles that are relevant now
		visiblePuddles: 0, // current amount of puddles that are relevant now, and also founded
	}

});
