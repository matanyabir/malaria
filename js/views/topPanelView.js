const TopPanelView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .next-day": "nextDayClick"
		,"click .next-month": "nextMonthClick"
  	},

	initialize ()
	{
		const $cal = $('<div class="cal"></div>');
		let days = 0;
		const {periods} = this.model.get('time');
		periods.forEach((p) => {
			const $period = $('<div class="period"></div>');
			const left = days + 'px';
			const width = p.duration + 'px';
			$period.css({left, width});
			days += p.duration;
			if (p.type === PERIOD_TYPE.HOT) {
				$period.addClass('hot-period');
			}
			$cal.append($period);
		});
		this.$day = $('<span class="day"></span>');
		$cal.append(this.$day);
		$cal.css({width: days + "px"});

		this.$nextDayButton = $('<button class="next-day"></button>');
		this.$nextMonthButton = $('<button class="next-month"></button>');
		this.$el.html($cal)
			.append(this.$nextMonthButton)
			.append(this.$nextDayButton);
		this.model.on('change:day', this.renderDay, this);
		this.model.on('change:loading', this.onLoadingChange, this);
		return this;
	},

	render ()
	{
		this.renderDay();
		return this;
	},

	onLoadingChange ()
	{
		const loading = this.model.get('loading');
		if (loading) {
			this.$el.addClass('loading');
		} else {
			this.$el.removeClass('loading');
		}
	},

	renderDay ()
	{
		const day = this.model.get('day');
		let time = new Date(this.model.get('time').start).getTime();
		time += day * 24 * 60 * 60 * 1000;
		const date = new Date(time);
		const dateStr = `${date.getDate()}.${1+date.getMonth()}`;
		this.$day.html(dateStr).css({left: day + 'px'});
	},

	nextDayClick ()
	{
		this.model.incDay();
	},

	nextMonthClick ()
	{
		let i = 30;
		const incDay = ()=> {
			i--;
			if (i) {
				this.model.incDay(incDay);
			}
		};
		incDay();
	},

});
