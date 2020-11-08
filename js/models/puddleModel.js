/**
 * PuddleModel -
 *
 * @author Matanya
 */
const PuddleModel = Backbone.Model.extend(
{
	elementType: "puddle",
	// default values
	defaults:
	{
		pos: null
		,id: null
		,state: null // current state PUDDLE_STATE
		,loc: LOCATION.INSIDE_VILLAGE
		,visible: false
		,isSatellite: false // can be found with satellite
	},
	destroy: function (options) {
		// don't make a server call, just delete from collection and call success
		this.trigger('destroy', this, this.collection, options);
		if (options && options.success) {
			options.success();
		}
	},
	initialize ()
	{
		this.on('change:periodIndex', this.onPeriodChange, this);
		return this;
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

	onPeriodChange ()
	{
		const periodIndex = this.get('periodIndex');
		const states = this.get('states');
		if (states) {
			const state = states[periodIndex];
			this.set({state});
		}
	},
	found: function (isSatellite)
	{
		if (!this.get("visible") && this.get('state') !== PUDDLE_STATE.EMPTY && (!isSatellite || this.get('isSatellite'))) {
			this.set({visible: true});
			return true;
		}
	},

});
