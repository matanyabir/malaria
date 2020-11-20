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

	/**
	 * create display string fot date, e.g.: "27/3"
	 *
	 * @param {Date} date - the date
	 * @return {string} strDate - the display date
	 * @author Matanya
	 */
	me.getDateStr = function(date)
	{
		return `${date.getDate()}/${1+date.getMonth()}`;
	};

	return me;
})();
