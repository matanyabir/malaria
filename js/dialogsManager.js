/**
 * open dialogs functions
 */
const DialogManager = (function()
{
	const me = {};

	/**
	 * open dialog
	 *
	 * @param {string} title - the dialog title
	 * @param {string} text - the dialog text
	 * @param {array} buttons - array of {text,cb} button object
	 * @author Matanya
	 */
	me.openDialog = function(title, text, buttons)
	{
		const model = new Backbone.Model({title, text, buttons});
		const view = new DialogView({model});
		$('body').append(view.render().$el);
	};
	return me;
})();
