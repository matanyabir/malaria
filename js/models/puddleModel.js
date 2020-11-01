/**
 * PuddleModel -
 *
 * @author Matanya
 */
const PuddleModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		pos: null
		,id: null
		,state: null // current state PUDDLE_STATE
		,visible: false
	},

	initialize: function ()
	{
		this.on('change:periodIndex', this.onPeriodChange, this);
		return this;
	},

	onPeriodChange: function ()
	{
		const periodIndex = this.get('periodIndex');
		const states = this.get('states');
		const state = states[periodIndex];
		this.set({state, visible: false}); // TBD: delete also risusim, eggs, etc.?
	},
	found: function ()
	{
		if (!this.get("visible") && this.get('state') !== PUDDLE_STATE.EMPTY) {
			this.set({visible: true});
			return true;
		}
	},

});
