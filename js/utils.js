/**
 * Utils functions
 */
const Utils = (function()
{
	const me = {};

	/**
	 * create display string fot number, e.g.: 12345 -> "12,345"
	 *
	 * @param {number} num - the number
	 * @return {string} strNum - the display number
	 * @author Matanya
	 */
	me.numTxt = function(num)
	{
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return me;
})();
