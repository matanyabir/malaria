const TopPanelView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .play-pause": "playPauseClick",
		"click .next-day": "nextDayClick",
		"click .next-month": "nextMonthClick",
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

		this.$mainStatus = $('<div class="main-status"></div>');
		this.$playPauseButton = $('<button class="play-pause enable-during-loading"></button>');
		this.$nextDayButton = $('<button class="next-day"></button>');
		this.$nextMonthButton = $('<button class="next-month"></button>');
		this.$el.html($cal)
			.append(this.$mainStatus)
			.append(this.$playPauseButton)
			.append(this.$nextDayButton)
			.append(this.$nextMonthButton);
		this.model.on('change:day', this.renderDay, this);
		this.model.on('change:loading', this.onLoadingChange, this);
		this.model.on('change:end', this.renderStatus, this);
		return this;
	},

	render ()
	{
		this.renderDay();
		this.renderStatus();
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
		this.renderStatus();
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
	renderStatus ()
	{
		let text;
		if (this.model.get('end')) {
			text = "TBD. Level end.";
		} else	if (this.model.get('loading')) {
			text = "Calculating simulation...";
		} else {
			text = "Paused";
		}
		this.$mainStatus.text(text);
	},

	playPauseClick ()
	{
		if (this.model.get('play'))
		{
			this.model.set('play', false);
			this.$playPauseButton.removeClass('playing');
		} else {
			this.startPlay(9999);
		}
	},

	nextDayClick ()
	{
		this.model.incDay();
	},

	startPlay (max)
	{
		this.model.set('play', true);
		this.$playPauseButton.addClass('playing');
		const incDay = ()=> {
			max--;
			if (max && this.model.get('play')) {
				this.model.incDay(incDay);
			}
		};
		incDay();

	},

	nextMonthClick ()
	{
		this.startPlay(30);
	},

});
