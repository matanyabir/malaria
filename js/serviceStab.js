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

	const _getMosquitoes = function () {
		const {kpis, size} = _data;
		const mosquitoes = [];
		let i = 0;
		while (i < kpis.mosquitoes) {
			const m = {
				x: Math.floor(Math.random() * size.width),
				y: Math.floor(Math.random() * size.height),
			};
			if (Math.random() > 0.9) {
				m.c = Math.ceil(1 + Math.random()*20);
				i += m.c;
			} else {
				i++;
			}
			mosquitoes.push(m);
		}
		return mosquitoes;
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
		setTimeout(function(){
			cbSuccess(_getMosquitoes());
		}, 50 + Math.random()*100);
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
		setTimeout(function(){
			days++;
			if (days % 90 === 0) {
				wet = !wet;
			}
			// const kpis = _.clone(_data.kpis);
			const {kpis} = _data;

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
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 + Math.random() / 40));
			} else {
				kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 - Math.random() / 50));
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 - Math.random() / 60));
			}
			let mosquitoes = null;
			if (getMosquitoes) {
				mosquitoes = _getMosquitoes();
			}
			cbSuccess({kpis, mosquitoes});
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
		lastYear: { // like kpis, but array of all values of "last year"
			mosquitoes: [2000,2038,2047,2094,2125,2165,2214,2223,2255,2278,2302,2302,2349,2366,2396,2436,2469,2506,2510,2539,2597,2660,2666,2693,2752,2759,2761,2802,2853,2920,2990,3008,3060,3125,3196,3264,3294,3347,3397,3441,3455,3536,3585,3670,3711,3726,3773,3803,3841,3934,4022,4063,4100,4127,4140,4143,4157,4204,4304,4363,4434,4517,4563,4649,4693,4787,4796,4814,4819,4916,4958,5047,5085,5142,5154,5163,5234,5236,5336,5347,5348,5419,5457,5470,5587,5623,5726,5852,5895,5946,5916,5870,5778,5765,5697,5623,5615,5614,5548,5480,5470,5429,5339,5275,5192,5160,5125,5090,5033,5015,4961,4922,4907,4890,4883,4811,4768,4729,4686,4633,4628,4575,4525,4508,4461,4417,4415,4354,4347,4310,4282,4245,4188,4155,4132,4088,4079,4044,4042,4009,3974,3949,3904,3841,3815,3771,3728,3693,3658,3614,3559,3540,3482,3443,3394,3339,3311,3275,3272,3264,3239,3228,3191,3170,3159,3108,3104,3071,3063,3058,3038,3014,2993,2957,2921,2917,2901,2900,2895,2861,2918,2946,2984,3050,3095,3160,3231,3256,3327,3408,3441,3511,3597,3601,3672,3714,3788,3871,3916,3939,3972,3977,4014,4089,4168,4174,4220,4297,4387,4441,4516,4623,4682,4761,4780,4823,4878,4923,5016,5021,5130,5250,5345,5468,5547,5654,5683,5810,5915,5940,6033,6067,6160,6249,6339,6442,6573,6649,6780,6832,6992,7111,7235,7343,7463,7555,7678,7782,7797,7936,8082,8118,8160,8260,8265,8386,8457,8641,8728,8862,8926,9037,9103,9315,9464,9606,9813,9981,10032,10219,10091,10077,9923,9865,9716,9650,9649,9636,9518,9469,9408,9274,9265,9231,9208,9133,9005,8884,8787,8689,8638,8622,8532,8445,8341,8322,8286,8245,8127,8001,7887,7829,7756,7668,7650,7583,7525,7480,7398,7289,7258,7186,7072,7062,6986,6967,6957,6880,6851,6813,6701,6659,6610,6525,6430,6380,6311,6254,6214,6213,6176,6116,6112,6106,6039,5966,5893,5822,5770,5752,5728,5686,5636,5598,5566,5513,5425,5353,5294,5224,5214,5170,5135,5101,5037,4994,4941,4925,4865,4793,4818],
			ill: [8,8,8,9,9,9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,10,10,11,11,11,12,12,12,12,12,12,12,11,10,10,10,10,10,11,11,10,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11,11,10,10,9,9,9,9,9,9,9,10,10,11,10,10,10,10,10,10,9,9,9,9,9,9,9,9,9,9,9,8,8,8,8,8,8,8,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,10,11,12,13,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,14,14,14,14,14,14,14,14,15,15,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,16,16,16,16,16,16,15,15,15,15,15,15,15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,20,20,20,20,21,21,21,21,21,21],
			illMosquitoes: [230,231,234,234,234,238,238,242,244,247,249,249,253,254,257,261,264,264,266,266,269,269,269,269,270,273,274,275,275,281,286,287,288,293,299,299,302,306,312,314,316,317,322,324,330,332,334,340,344,346,347,355,356,357,358,358,359,362,368,373,373,377,377,384,392,396,397,405,405,408,415,416,419,425,428,435,437,441,449,452,456,461,462,467,470,480,485,494,505,515,506,505,504,498,495,486,484,476,473,465,464,463,461,459,454,452,447,442,434,430,428,426,422,415,412,411,406,403,396,393,391,388,387,383,379,375,373,372,369,366,364,362,360,354,351,346,343,337,334,333,330,329,327,325,323,321,317,316,314,309,305,300,297,292,291,286,281,277,273,271,267,265,262,258,255,252,251,248,247,245,243,241,238,234,231,229,226,224,220,219,219,220,220,222,223,226,231,236,236,241,241,241,242,244,246,246,247,248,253,256,258,261,266,270,271,271,272,273,279,282,288,291,296,296,302,304,306,306,310,315,316,318,323,327,334,339,344,348,351,356,362,363,365,370,371,372,380,388,393,397,406,415,415,421,431,434,434,439,446,456,458,462,470,474,474,475,484,493,497,506,513,520,523,526,538,541,544,557,560,573,570,560,555,552,547,539,530,527,519,518,511,506,498,492,485,483,479,477,474,473,472,470,465,464,456,454,451,448,447,444,436,432,429,425,421,414,411,405,401,398,394,390,385,383,380,378,374,368,367,365,362,356,350,345,343,342,336,331,330,328,326,320,315,310,308,306,301,296,292,289,287,283,280,275,272,269,268,267,263,259,255,252,248,244,242,238,237,234,231,229,233]
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
