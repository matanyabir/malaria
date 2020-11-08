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
	let wet = true;
	let days = 0;
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
			days++;
			if (days % 90 === 0) {
				wet = !wet;
			}
			const kpis = _data.kpis;
			const illRandom = Math.random();
			if (illRandom>0.9) { // 10% of 1 more ill
				kpis.ill++;
			}
			if (illRandom<0.05 && kpis.ill) {// 5% of 1 less ill
				kpis.ill--;
			}
			_.forEach(kpis.puddlesMap, (p) => {
				p.e = Math.floor(Math.random()*25);
				p.l = Math.floor(Math.random()*20);
				p.p = Math.floor(Math.random()*15);
			});
			if (wet) {
				kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 + Math.random() / 50));
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 + Math.random() / 50));
			} else {
				kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 - Math.random() / 50));
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 - Math.random() / 50));
			}
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
            searchVillageSatellite: 5, // cost of search puddles inside the village with satellite
            searchOutSatellite: 25, // cost of search puddles outside the village with satellite
            searchVillage: 50, // cost of search puddles inside the village
            searchOut: 250, // cost of search puddles outside the village
            sprayHouse: 30, // cost of spray 1 house
            sprayPuddle: 1, // cost of spray 1 puddle
            dryPuddle: 20, // cost of destroy 1 puddle
        },
		kpis: {
			population: 100, // current amount of humans
			ill: 8, // current amount of ill humans
			mosquitoes: 2000, // current amount of mosquitoes
			illMosquitoes: 230, // current amount of ill mosquitoes
			puddlesMap: { // map of count of eggs, lavraes, popaes per puddle id
				p0: {
					e: 17,
					l: 13,
					p: 12
				},
				p10: {
					e: 10,
					l: 10,
					p: 3
				},
				p20: {
					e: 11,
					l: 13,
					p: 9
				},
				p1: {
					e: 7,
					l: 3,
					p: 2
				},
				p2: {
					e: 0,
					l: 3,
					p: 5
				},
				p3: {
					e: 1,
					l: 1,
					p: 2
				},
				p4: {
					e: 6,
					l: 6,
					p: 4
				},
				p5: {
					e: 3,
					l: 9,
					p: 2
				},
				p6: {
					e: 17,
					l: 13,
					p: 12
				},
				p7: {
					e: 1,
					l: 0,
					p: 3
				},
				p8: {
					e: 3,
					l: 4,
					p: 8
				},
				p9: {
					e: 8,
					l: 7,
					p: 6
				},
				p11: {
					e: 7,
					l: 3,
					p: 2
				},
				p12: {
					e: 0,
					l: 3,
					p: 5
				},
				p13: {
					e: 1,
					l: 1,
					p: 2
				},
				p14: {
					e: 6,
					l: 6,
					p: 4
				},
				p15: {
					e: 3,
					l: 9,
					p: 2
				},
				p16: {
					e: 17,
					l: 13,
					p: 12
				},
				p17: {
					e: 1,
					l: 0,
					p: 3
				},
				p18: {
					e: 3,
					l: 4,
					p: 8
				},
				p19: {
					e: 8,
					l: 7,
					p: 6
				},
				p21: {
					e: 7,
					l: 3,
					p: 2
				},
				p22: {
					e: 0,
					l: 3,
					p: 5
				},
				p23: {
					e: 1,
					l: 1,
					p: 2
				},
				p24: {
					e: 6,
					l: 6,
					p: 4
				},
				p25: {
					e: 3,
					l: 9,
					p: 2
				},
				p26: {
					e: 17,
					l: 13,
					p: 12
				},
				p27: {
					e: 1,
					l: 0,
					p: 3
				},
				p28: {
					e: 3,
					l: 4,
					p: 8
				},
				p29: {
					e: 8,
					l: 7,
					p: 6
				},

			}
		},
		cash: 600,
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
				id: "p0",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 728, y:160},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p1",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 300, y:120},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p2",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 700, y:120},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 3rd period
				id: "p3",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 880, y:220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p4",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 180, y:720},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p5",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1020, y:720},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p6",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 200, y:1020},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK],
			},
			{
				id: "p7",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1100, y:1220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p8",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 60, y:40},
				// state (not seasonal):
				state: PUDDLE_STATE.STRONG,
			},
            {
				id: "p9",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 95, y:22},
				// state (not seasonal):
				state: PUDDLE_STATE.WEAK,
			},
			{
				id: "p10",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 810, y:150},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p11",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 280, y:150},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p12",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 600, y:90},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 3rd period
				id: "p13",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 880, y:220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p14",
				isSatellite: true, // can be found with satellite
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1180, y:290},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p15",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1120, y:820},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p16",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 100, y:920},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK],
			},
			{
				id: "p17",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1100, y:1220},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p18",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 20, y:35},
				// state (not seasonal):
				state: PUDDLE_STATE.STRONG,
			},
            {
				id: "p19",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 195, y:42},
				// state (not seasonal):
				state: PUDDLE_STATE.WEAK,
			},
			{
				id: "p20",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 910, y:450},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p21",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 400, y:250},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p22",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1300, y:390},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 3rd period
				id: "p23",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 780, y:90},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p24",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 666, y:333},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK],
			},
			{
				// note: this puddle will appear only at 2nd period
				id: "p25",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 777, y:666},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p26",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 888, y:888},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK],
			},
			{
				id: "p27",
				loc: LOCATION.OUTSIDE_VILLAGE,
				pos : {x: 1200, y:1200},
				// state per period (Seasonal):
				states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.WEAK, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			},
			{
				id: "p28",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 420, y:135},
				// state (not seasonal):
				state: PUDDLE_STATE.STRONG,
			},
            {
				id: "p29",
				loc: LOCATION.INSIDE_VILLAGE,
				pos : {x: 180, y:342},
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
			{
				id: "h7",
				pos : {x: 440, y:100}
			},
			{
				id: "h8",
				pos : {x: 455, y:204}
			},
			{
				id: "h9",
				pos : {x: 330, y:200}
			},
			{
				id: "h10",
				pos : {x: 250, y:280}
			},
			{
				id: "h11",
				pos : {x: 50, y:140}
			},
			{
				id: "h12",
				pos : {x: 250, y:110}
			},
			{
				id: "h13",
				pos : {x: 280, y:370}
			},
			{
				id: "h14",
				pos : {x: 455, y:444}
			},
			{
				id: "h15",
				pos : {x: 120, y:220}
			},
			{
				id: "h16",
				pos : {x: 480, y:460}
			},
			{
				id: "h17",
				pos : {x: 190, y:490}
			},
			{
				id: "h18",
				pos : {x: 355, y:224}
			},
			{
				id: "h19",
				pos : {x: 79, y:290}
			},
			{
				id: "h20",
				pos : {x: 333, y:287}
			},
		],
	};

	return me;
})();
