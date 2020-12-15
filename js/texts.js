const TEXTS = {
	sidePanel: {
		kpis: {
			cash: "The amount of cash that you have to perform your actions",
			pud: "The amount of visible puddles / The amount of all puddles (in current season)",
			hos: "The amount of houses in the village",
			pop: "The amount of people in the village",
			infectedHuman: "The amount of infected people in the village",
			mos: "The amount of mosquitoes",
			illMos: "The amount of infectious mosquitoes"
		},
		actions: {
			srcInDrone: "Search for puddles with drone inside the village",
			srcOutDrone: "Search for puddles with drone outside the village",
			srcInSat: "Search for puddles with satellite inside the village. NOTE: search with satellite is cheaper than drone, but it won't find all the puddles",
			srcOutSat: "Search for puddles with satellite outside the village. NOTE: search with satellite is cheaper than drone, but it won't find all the puddles",
			sprayPud: "Spray all the visible puddles in the map",
			sprayHos: "Spray all the houses in the map",
		},
	},
	selectedPanel: {
		kpis: {
			id: "The ID of the element",
			sprayed: "Is this element sprayed? And how long the spray will be effective?",
			egg: "The amount of eggs in this puddle",
			pup: "The amount of pupae in this puddle",
			lar: "The amount of lavrae in this puddle"
		},
		actions: {
			sprayPud: "Spray this puddle. This will be effective for 7 days",
			sprayHos: "Spray this house. This will be effective for 120 days",
			dryPud: "Destroy this puddle."
		},
	},
	topPanel: {
		logo: 'Detect is a non profit organization that will make the world a batter place',
		runState: 'Calculating simulation...',
		pauseState: 'Paused',
		play: "Run the simulation",
		pause: "Pause the simulation",
		incDay: "Run the simulation for 1 day",
		incMonth: "Run the simulation for 1 month",
		dryPud: "Destroy this puddle.",
		heatMap: "Heat Map View",
		normalMap: "Map View",
		graph: "Graphs View",
	},
	graph: {
		lastYear: 'Compare to the statistics of last year'
	},
	terms: {
		restartLevel: 'Restart Level',
		continue: 'Continue',
		wetPeriod: 'Wet Season',
		dryPeriod: 'Dry Season',
		mosquitoes: 'Mosquitoes',
		infectiousMosquitoes: 'Infectious Mosquitoes',
		illPeople: 'Ill People',
		mosquitoesLY: 'Last Year Mosquitoes',
		infectiousMosquitoesLY: 'Last Year Infectious Mosquitoes',
		illPeopleLY: 'Last Year Ill People',
		seasonalPuddle: 'Seasonal Puddle',
		permanentPuddle: 'Permanent Puddle',
		house: 'House',
		sprayedHouses: 'Sprayed Houses',
		sprayedPuddles: 'Sprayed Puddles',
		dryedPuddles: 'Destroyed Puddles',
		daysLeft: 'days left', // e.g.: "12 days left"
		notSprayed: 'Not sprayed',
	}
};
