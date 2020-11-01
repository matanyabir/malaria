// type for period
const PERIOD_TYPE = {
	HOT: 0
	,COLD: 1
};

// location type for puddles
const LOCATION = {
	INSIDE_VILLAGE: 0
	,OUTSIDE_VILLAGE: 1
};

// state for puddle, per period
const PUDDLE_STATE = {
	EMPTY: 0 // doesn't exist in this period
	,WEAK: 1 // exists, but can be destroyed
	,STRONG: 2 // exists, and can't be destroyed
};

const EXAMPLE_LEVEL = {
	stats: {
		tbd: 'can be stats from "last year" etc.'
	},
	rules: {
		tbd: "can override many rules, e.g.: death-rate of mosquitoes"
	},
	kpis: {
		population: 520, // current amount of humans
		ill: 17, // current amount of ill humans
		mosquitoes: 20170, // current amount of mosquitoes
		illMosquitoes: 17, // current amount of ill mosquitoes
	},
	cash: 12500,
	size: {
		width: 1000,
		height: 1000,
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
			// state per period:
			states: [PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY, PUDDLE_STATE.STRONG, PUDDLE_STATE.EMPTY],
			eggs:[
				{
					lvl: 1, // created before x days
					count: 5 // how many eggs in this level
				},
				{
					lvl: 3, // created before x days
					count: 2 // how many eggs in this level
				},
				{
					lvl: 7, // created before x days
					count: 1 // how many eggs in this level
				},
			]
		},
		{
			id: "p2",
			loc: LOCATION.OUTSIDE_VILLAGE,
			pos : {x: 700, y:120},
			// state per period:
			states: [PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY],
			eggs:[
				{
					lvl: 11, // created before x days
					count: 1 // how many eggs in this level
				},
			]
		},
		{
			// note: this puddle will appear only at 3rd period
			id: "p3",
			loc: LOCATION.OUTSIDE_VILLAGE,
			pos : {x: 880, y:220},
			// state per period:
			states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.EMPTY],
		},
		{
			// note: this puddle will appear only at 2nd period
			id: "p4",
			loc: LOCATION.OUTSIDE_VILLAGE,
			pos : {x: 180, y:720},
			// state per period:
			states: [PUDDLE_STATE.EMPTY, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK, PUDDLE_STATE.WEAK],
		},
	],
	mosquitoes: [
		{
			id: "m1",
			pos : {x: 111, y:211},
			bld: 87, // blood level
			f: { // female
				c: true, // can make eggs
				m: true, // can make people ill
				p: 1, // start create eggs before x days
			}
		},
		{
			id: "m2",
			pos : {x: 222, y:333},
			bld: 50, // blood level
			f: { // female
			}
		},
		{
			id: "m3",
			pos : {x: 341, y:250},
		},
		{
			id: "m4",
			pos : {x: 500, y:600},
			f: { // female
				c: true, // can make eggs
			}
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
			pos : {x: 700, y:700}
		},
		{
			id: "h4",
			pos : {x: 555, y:444}
		},
	],
	humans: [
		{
			id: "p1",
			pos : {x: 100, y:200},
			out : {x: 170, y:270}, // go out to this position
			m: true // ill
		},
		{
			id: "p2",
			pos : {x: 150, y:300},
			m: 3 // was infected before x days
		},
		{
			id: "p3",
			pos : {x: 700, y:700}
		},
		{
			id: "p4",
			pos : {x: 555, y:444}
		},
	]
};
