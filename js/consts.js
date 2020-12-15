// type for period
const PERIOD_TYPE = {
	DRY: 0
	,WET: 1
};

// type for dialogs from the server after incDay
const DIALOG_TYPE = {
	INFORMATION: 0 // e.g.: spray period ended
	,GAME_OVER: 1 // e.g.: too many ill people
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
