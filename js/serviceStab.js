/**
 * Stab class for debugging...
 */
const Service = (function()
{
	const me = {};

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
		setTimeout(function(){
			cbSuccess(_data);
		}, 300 + Math.random()*300);
	};

	/**
	 * set the data to the service
	 *
	 * @param {string} mapInstanceId - the id that represents the curr level instance
	 * @param {function} cbSuccess - the callback that should be call in case of success, return object of kpis
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.incDay = function(mapInstanceId, cbSuccess, cbFail)
	{
		setTimeout(function(){
			const kpis = _data.kpis;
			if (Math.random()>0.9) {
				kpis.ill++;
			}
			kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 + Math.random()/30));
			kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 + Math.random()/50));
			cbSuccess(kpis);
		}, 50 + Math.random()*100);
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
		setTimeout(function(){
			cbSuccess({});
		}, Math.random()*100);
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
		setTimeout(function(){
			cbSuccess({});
		}, Math.random()*100);
	};

	const _data = {
		id: 'random1234', // id of current "instance" of the level: this current instance of the level of this user, etc.
		stats: {
			tbd: 'can be stats from "last year" etc.'
		},
		rules: {
			tbd: "can override many rules, e.g.: death-rate of mosquitoes"
		},
        costs: 	{
            searchVillage: 1000, // cost of search puddles inside the village
            searchOut: 2500, // cost of search puddles outside the village
            sprayHouse: 10, // cost of spray 1 house
            sprayPuddle: 20, // cost of spray 1 puddle
            dryPuddle: 200, // cost of destroy 1 puddle
        },
		kpis: {
			population: 520, // current amount of humans
			ill: 17, // current amount of ill humans
			mosquitoes: 20170, // current amount of mosquitoes
			illMosquitoes: 1808, // current amount of ill mosquitoes
		},
		cash: 12500,
		size: {
			width: 1500,
			height: 1400,
		},
		time: {
			start: "1/1/2020", // note: the year isn't important...
			periods:[
				{
					type: PERIOD_TYPE.COLD,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.HOT,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.COLD,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.HOT,
					duration: 90 // duration in days
				}
			]
		},
		puddles: [
			{
				id: "p1",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 300, y:120},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p2",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 700, y:120},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 3rd period
				id: "p3",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 880, y:220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p4",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 180, y:720},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p5",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1020, y:720},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p6",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 200, y:1020},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK],
			},
			{
				id: "p7",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1100, y:1220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p8",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 60, y:40},
				// state (not seasonal):
				state: PUDDLE_STATE.STRONG,
			},
            {
				id: "p9",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 95, y:22},
				// state (not seasonal):
				state: PUDDLE_STATE.WEAK,
			},

		],
		houses: [
			{
				id: "h1",
				pos : {x: 100, y:200}
			},
			{
				id: "h2",
				pos : {x: 150, y:300}
			},
			{
				id: "h3",
				pos : {x: 70, y:70}
			},
			{
				id: "h4",
				pos : {x: 455, y:444}
			},
			{
				id: "h5",
				pos : {x: 20, y:480}
			},
			{
				id: "h6",
				pos : {x: 420, y:80}
			},
		],
	};

	return me;
})();
