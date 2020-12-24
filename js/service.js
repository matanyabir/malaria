/**
 * handle the calls to the service
 */
const Service = (function()
{
	const SERVER_URL = "http://localhost:3000";
	const me = {};

	const convertMosquitoes = function (arr) {
		if (arr) {
			return arr.map(([x, y, c]) => {
				x, y, c
			});
		}
	};
	/**
	 * create a new level ("level instance") for "level class id"
	 *
	 * @param {string} levelId - the "level class id"
	 * @param {function} cbSuccess - the callback that should be call with the "new level instance"
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.startLevel = function(levelId, cbSuccess, cbFail)
	{
		$.get(SERVER_URL + "/levels/" + levelId, function( data ) {
			cbSuccess( data );
		}).fail(function(){
			if (cbFail) {
				cbFail();
			} else {
				alert("Failed to start level");
			}
		});
	};

	/**
	 * get the mosquitoes to map instance
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {function} cbSuccess - the callback that should be call in case of success, return array of mosquitoes
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.getMosquitoes = function(mapInstanceId, cbSuccess, cbFail)
	{
		$.get(SERVER_URL + "/map/" + mapInstanceId + "/mosquitoes", function( data ) {
			cbSuccess( convertMosquitoes(data) );
		}).fail(function(){
			if (cbFail) {
				cbFail();
			} else {
				alert("Failed to getMosquitoes");
			}
		});
	};
	/**
	 * tell the server to inc the day of map instance, and get back results
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {boolean} getMosquitoes - do we want to get the mosquitoes in the cbSuccess?
	 * @param {function} cbSuccess - the callback that should be call in case of success, return object of kpis, mosquitoes
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.incDay = function(mapInstanceId, getMosquitoes, cbSuccess, cbFail)
	{
		const data = {getMosquitoes, inc: 1};
		$.ajax({
			url: SERVER_URL + "/map/" + mapInstanceId + "/inc",
			type: 'PUT',
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(data) {
				if (data.mosquitoes) {
					data.mosquitoes = convertMosquitoes(data.mosquitoes);
				}
				cbSuccess(data);
			},
			fail: function(data) {
				if (cbFail) {
					cbFail();
				} else {
					alert("Failed to incDay");
				}
			}
		});
	};

	/**
	 * notify the server that the user sprayed some houses
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {array} housesIds - array of all the houses ids that we want to spray, or the string "all"
	 * @param {function} cbSuccess - the callback that should be call in case of success, return object of kpis (relevant???)
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.sprayHouses = function(mapInstanceId, housesIds, cbSuccess, cbFail)
	{
		const data = {housesIds};
		$.ajax({
			url: SERVER_URL + "/map/" + mapInstanceId + "/spray/houses",
			type: 'PUT',
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(data) {
				cbSuccess(data);
			},
			fail: function(data) {
				if (cbFail) {
					cbFail();
				} else {
					alert("Failed to sprayHouses");
				}
			}
		});
	};

	/**
	 * notify the server that the user dry some puddles
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {array} puddlesIds - array of all the puddles ids that we want to dry
	 * @param {function} cbSuccess - the callback that should be call in case of success, return object of kpis (if we want to handle eggs count in puddles, etc.)
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.dryPuddles = function(mapInstanceId, puddlesIds, cbSuccess, cbFail)
	{
		const data = {puddlesIds};
		$.ajax({
			url: SERVER_URL + "/map/" + mapInstanceId + "/destroy",
			type: 'PUT',
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(data) {
				cbSuccess(data);
			},
			fail: function(data) {
				if (cbFail) {
					cbFail();
				} else {
					alert("Failed to dryPuddles");
				}
			}
		});
	};

	/**
	 * notify the server that the user sprayed some puddles
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {array} puddlesIds - array of all the puddles ids that we want to spray
	 * @param {function} cbSuccess - the callback that should be call in case of success, return object of kpis (if we want to handle eggs count in puddles, etc.)
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.sprayPuddles = function(mapInstanceId, puddlesIds, cbSuccess, cbFail)
	{
		const data = {puddlesIds};
		$.ajax({
			url: SERVER_URL + "/map/" + mapInstanceId + "/spray/puddles",
			type: 'PUT',
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(data) {
				cbSuccess(data);
			},
			fail: function(data) {
				if (cbFail) {
					cbFail();
				} else {
					alert("Failed to sprayPuddles");
				}
			}
		});
	};

	/**
	 * notify the server that the user closed the browser...
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @author Matanya
	 */
	me.onClose = function(mapInstanceId, puddlesIds, cbSuccess, cbFail)
	{
		$.ajax({
			url: SERVER_URL + "/map/" + mapInstanceId + "/onClose",
			type: 'PUT',
			success: function(data) {},
			fail: function(data) {}
		});
	};

	return me;
})();
