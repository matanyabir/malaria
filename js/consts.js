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

// the options of which view to show
const TABS_VIEWS = {
	HEAT_MAP: 0 // heat-map view
	,NORMAL_MAP: 1 // map view
	,GRAPH_VIEW: 2 // graph view
};
