const TopPanelView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .next-day": "nextDayClick"
		,"click .next-month": "nextMonthClick"
  	},

	initialize ()
	{
		this.$day = $('<span class="day"></span>');
		this.$nextDayButton = $('<button class="next-day">+ 1 day</button>');
		this.$nextMonthButton = $('<button class="next-month">+ 30 days</button>');
		this.$cash = $('<span class="cash"></span>');
		this.$dayContainer = $('<div class="day-container"></div>')
			.append('<span class="day1">Day: </span>')
			.append(this.$day);
		this.$cashContainer = $('<div class="cash-container"></div>')
			.append('<span class="cash1">Cash: </span>')
			.append(this.$cash);
		this.$el.html(this.$dayContainer)
			.append(this.$cashContainer)
			.append(this.$nextMonthButton)
			.append(this.$nextDayButton);
		this.model.on('change:day', this.renderDay, this);
		this.model.on('change:periodIndex', this.renderPeriod, this);
		this.model.on('change:cash', this.renderCash, this);
		return this;
	},

	render ()
	{
		this.renderDay();
		this.renderPeriod();
		this.renderCash();
		return this;
	},

	renderDay ()
	{
		let time = new Date(this.model.get('time').start).getTime();
		time += this.model.get('day') * 24 * 60 * 60 * 1000;
		const date = new Date(time);
		const dateStr = `${date.getDate()}.${1+date.getMonth()}`;
		this.$day.html(dateStr);
	},

	renderPeriod ()
	{
		const period = this.model.getCurrPeriod();
		if (!period) {
			this.$day.html('TBD. Level ended.');
		}
		if (period.type === PERIOD_TYPE.HOT) {
			this.$day.addClass('hot-period');
		} else {
			this.$day.removeClass('hot-period');
		}
	},

	renderCash ()
	{
		const cash = this.model.get('cash') + "$";
		this.$cash.html(cash);
	},

	nextDayClick ()
	{
		this.model.incDay();
	},

	nextMonthClick ()
	{
		for (let i = 0; i < 30; i++) {
			this.model.incDay();
		}
	},

});
