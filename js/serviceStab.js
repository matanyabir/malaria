/**
 * Stab class for debugging...
 */
const Service = (function()
{
	const me = {};

	let wet = true;
	let days = 0;
	let sprayCount = 0;
	let sprayPuddlesLeft = -1;
	let alreadyFailed;
	let lastPuddlesIds;

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
		}, 10 + Math.random()*100);
	};

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
			let mosFactor = 1; // multiply the mosquitoes with this number
			if (sprayCount > 100) {
				mosFactor = 0.9955;
			}
			else if (sprayCount > 50) {
				mosFactor = 0.9965;
			}
			else if (sprayCount > 10) {
				mosFactor = 0.9975;
			}
			else if (sprayCount > 0) {
				mosFactor = 0.998;
			}
			else {
				mosFactor = 1;
			}
			if (wet) {
				kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 + Math.random() / 50));
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 + Math.random() / 40));
			} else {
				kpis.mosquitoes = Math.floor(kpis.mosquitoes * (1 - Math.random() / 60));
				kpis.illMosquitoes = Math.floor(kpis.illMosquitoes * (1 - Math.random() / 60));
			}
			kpis.mosquitoes = Math.round(kpis.mosquitoes * mosFactor);
			kpis.illMosquitoes = Math.round(kpis.illMosquitoes * mosFactor);
			let chanceOfMoreIll = 0; // chance of 1 more ill
			let chanceOfLessIll = 0; // chance of 1 less ill
			if (kpis.mosquitoes < 2000) {
				chanceOfMoreIll = 0.01; // 1% of 1 more ill
				chanceOfLessIll = 0.1; // 10% of 1 less ill
			}
			else if (kpis.mosquitoes < 2200) {
				chanceOfMoreIll = 0.05; // 5% of 1 more ill
				chanceOfLessIll = 0.05; // 5% of 1 less ill
			}
			else if (kpis.mosquitoes < 3000) {
				chanceOfMoreIll = 0.08; // 8% of 1 more ill
				chanceOfLessIll = 0.06; // 6% of 1 less ill
			}
			else if (kpis.mosquitoes < 4000) {
				chanceOfMoreIll = 0.11; // 11% of 1 more ill
				chanceOfLessIll = 0.06; // 6% of 1 less ill
			}
			else {
				chanceOfMoreIll = 0.13; // 13% of 1 more ill
				chanceOfLessIll = 0.05; // 5% of 1 less ill
			}
			const illRandom = Math.random();
			if (illRandom>1-chanceOfMoreIll) {
				kpis.ill++;
			}
			if (illRandom<chanceOfLessIll && kpis.ill) {// 5% of 1 less ill
				kpis.ill--;
			}
			_.forEach(kpis.puddlesMap, (p) => {
				p.e = Math.floor(Math.random()*25);
				p.l = Math.floor(Math.random()*20);
				p.p = Math.floor(Math.random()*15);
			});
			let mosquitoes = null;
			if (getMosquitoes) {
				mosquitoes = _getMosquitoes();
			}
			sprayPuddlesLeft--;
			let dialog = null;
			if (kpis.ill > 22 && !alreadyFailed) {
				alreadyFailed = true;
				dialog = {
					type: DIALOG_TYPE.GAME_OVER,
					title: 'Game Over',
					text: `Level failed. There are ${kpis.ill} ill people in the village, this is too much...`
				};
			} else if (sprayPuddlesLeft === 0) {
				const killedPupae = Math.ceil(Math.random()*10*lastPuddlesIds.length);
				const killedEggs = Math.ceil(Math.random()*15*lastPuddlesIds.length);
				dialog = {
					type: DIALOG_TYPE.INFORMATION,
					title: 'Spray Puddles Over',
					text: `The spray of the puddles "${lastPuddlesIds.join(',')}" was over. This spray killed ${killedPupae} papae, and ${killedEggs} eggs.`
				};
			}
			cbSuccess({kpis, mosquitoes, dialog});
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
		sprayCount += housesIds.length * 5;
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
		sprayCount += puddlesIds.length * 5;
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
		sprayPuddlesLeft = 7;
		lastPuddlesIds = puddlesIds;
		sprayCount += puddlesIds.length;
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
			mosquitoes: [2000,2011,2045,2069,2102,2113,2118,2136,2149,2163,2202,2212,2245,2258,2296,2321,2358,2394,2407,2454,2482,2489,2521,2529,2530,2549,2595,2633,2663,2675,2720,2769,2769,2801,2812,2833,2881,2907,2939,2977,3004,3060,3071,3093,3103,3138,3152,3193,3212,3216,3270,3283,3312,3366,3384,3447,3456,3500,3540,3551,3586,3627,3684,3726,3769,3798,3839,3844,3857,3918,3969,3997,4047,4124,4142,4164,4227,4260,4286,4313,4376,4459,4488,4511,4581,4652,4723,4775,4857,4902,4843,4782,4723,4665,4638,4571,4519,4470,4460,4423,4385,4365,4357,4286,4217,4214,4176,4142,4104,4096,4055,4050,4030,3983,3942,3887,3853,3793,3757,3715,3686,3665,3608,3573,3537,3521,3478,3469,3462,3454,3437,3401,3345,3331,3289,3277,3234,3196,3147,3098,3089,3072,3045,3041,3026,2976,2965,2930,2890,2864,2847,2812,2799,2762,2757,2714,2707,2706,2676,2670,2668,2636,2620,2600,2595,2563,2532,2515,2511,2474,2438,2433,2418,2396,2376,2338,2325,2294,2261,2249,2274,2280,2293,2313,2330,2346,2350,2354,2375,2413,2437,2437,2449,2471,2472,2478,2509,2540,2547,2550,2585,2585,2596,2603,2627,2652,2670,2720,2772,2787,2826,2863,2889,2902,2924,2953,2962,2971,3016,3036,3083,3089,3124,3171,3196,3227,3252,3262,3314,3368,3412,3463,3513,3536,3566,3602,3620,3626,3658,3711,3759,3793,3850,3881,3902,3918,3923,3940,3997,4072,4073,4138,4163,4219,4250,4261,4310,4364,4433,4467,4498,4526,4590,4594,4634,4726,4757,4795,4841,4854,4773,4696,4675,4666,4656,4608,4544,4531,4488,4471,4449,4399,4333,4331,4296,4247,4206,4193,4126,4059,4053,4020,3960,3939,3882,3869,3842,3835,3793,3776,3732,3680,3640,3613,3564,3516,3463,3437,3384,3361,3343,3325,3304,3278,3265,3222,3215,3187,3175,3156,3133,3099,3067,3028,3021,2988,2956,2911,2896,2877,2868,2844,2841,2804,2785,2770,2739,2715,2683,2645,2613,2573,2553,2512,2503,2475,2464,2428,2405,2390,2360,2344,2336,2308,2285,2271,2247,2239,2227,2200,2198],
			ill: [10,10,10,9,9,9,8,8,9,9,9,9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,8,8,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,7,7,8,8,8,7,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,13,13,13,13,13,13,13,13,14,14,15,16,16,16,16,16,16,17,18,18,18,18,18,18,18,18,18,18,18,19,20,20,20,19,19,19,19,20,20,20,21,21,21,22,22,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,21,21,22,22,22,22,22,22,22,23,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,24,24,24,25,25,25,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,25,25,25,25,25,25,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,26,26,26,26,25,25,25,25,26,26,26,26,26,26,26,27,27,28,28,29,28,28,29,29,28,27,26,25,25,25,25,26,26,27,27,27,27,26,26,26,27,27,27,27,27,27,26,26,25,24,24,24,24,24,24,24,24,24,24,24,24,24,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,21,21,21,20,20,20,20,20,19,19],
			illMosquitoes: [230,234,236,237,241,243,247,251,254,256,257,261,263,263,263,266,272,276,280,285,289,296,301,302,306,309,316,323,330,337,341,347,349,354,357,361,370,372,377,382,384,390,390,394,395,396,403,412,421,421,425,429,431,435,436,441,444,453,454,454,465,469,474,475,483,489,490,501,511,518,520,525,528,532,533,543,552,560,560,568,578,580,587,595,607,610,610,623,629,631,624,621,616,608,602,599,595,588,583,580,571,566,563,562,558,554,553,550,541,535,530,522,515,511,510,508,500,493,489,488,484,476,474,470,464,459,452,447,446,441,436,429,422,420,414,409,404,399,396,389,386,383,380,377,373,370,368,365,359,353,350,349,343,337,332,328,326,324,319,314,313,309,305,303,298,293,292,287,286,283,278,276,273,270,268,266,262,260,256,255,261,266,266,266,271,275,278,279,280,286,292,292,295,295,295,300,301,308,308,310,315,318,323,326,326,333,337,343,350,350,355,362,364,368,370,374,378,382,385,390,392,392,397,403,403,406,408,412,419,423,428,432,440,441,449,454,455,458,462,462,468,471,482,493,499,499,506,513,524,530,538,543,543,548,556,564,572,577,578,587,589,600,607,613,615,628,642,642,647,649,639,633,624,614,607,606,600,597,594,591,588,580,577,576,569,567,563,561,560,554,548,547,546,545,542,540,536,535,533,526,517,514,513,509,507,501,499,497,492,491,485,484,480,472,466,458,456,454,448,440,437,430,428,424,422,416,411,408,405,400,395,392,391,389,384,380,377,373,371,367,366,364,358,356,353,348,345,344,343,337,335,330,329,326,322,317,316,313,311,307,304]
		},
		kpis: {
			population: 100, // current amount of humans
			ill: 10, // current amount of ill humans
			mosquitoes: 2000, // current amount of mosquitoes
			illMosquitoes: 230, // current amount of ill mosquitoes
			puddlesMap: { // map of count of eggs, lavrae, pupae per puddle id
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
					type: PERIOD_TYPE.WET,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.DRY,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.WET,
					duration: 90 // duration in days
				},
				{
					type: PERIOD_TYPE.DRY,
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
