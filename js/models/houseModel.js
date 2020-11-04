/**
 * HouseModel -
 *
 * @author Matanya
 */
const HouseModel = Backbone.Model.extend(
{
	elementType: "house",
	// default values
	defaults:
	{
		pos: null
		,id: null
	},
	spray ()
	{
		this.set('spray', 7);
	},
	dayPass ()
	{
		const spray = this.get('spray');
		if (spray) {
			this.set('spray', spray - 1);
		}
	},

});
