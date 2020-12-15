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
		const $cal = $(`<div class="cal"></div>`);
		let days = 0;
		const {periods} = this.model.get(`time`);
		periods.forEach((p) => {
			const $period = $(`<div class="period"></div>`);
			const left = days + `px`;
			const width = p.duration + `px`;
			$period.css({left, width});
			days += p.duration;
			let hint;
			if (p.climate === PERIOD_TYPE.DRY) {
				$period.addClass(`dry-period`);
				hint = TEXTS.terms.dryPeriod;
			} else {
				hint = TEXTS.terms.wetPeriod;
			}
			const $periodIcon = $(`<div class="period-icon hint--bottom" aria-label="${hint}"></div>`);
			$period.html($periodIcon);
			$cal.append($period);
		});
		this.$day = $(`<span class="day"></span>`);
		$cal.append(this.$day);
		$cal.css({width: days + "px"});

		const tabsView = new TabsView({model: this.model});
		this.$mainStatus = $(`<div class="main-status"></div>`);
		this.$playPauseButton = $(`<button class="play-pause enable-during-loading hint--bottom-right" aria-label="${TEXTS.topPanel.play}"></button>`);
		this.$nextDayButton = $(`<button class="next-day hint--bottom-right" aria-label="${TEXTS.topPanel.incDay}"></button>`);
		this.$nextMonthButton = $(`<button class="next-month hint--bottom-right" aria-label="${TEXTS.topPanel.incMonth}"></button>`);
		this.$el.html($cal)
			.append(this.$mainStatus)
			.append(this.$playPauseButton)
			.append(this.$nextDayButton)
			.append(this.$nextMonthButton)
			.append(tabsView.render().$el)
			.append(`<div class="logo hint--left" aria-label="${TEXTS.topPanel.logo}">DETECT</div>`);
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
		const dateStr = Utils.getDateStr(date);
		this.$day.html(dateStr).css({left: day + 'px'});
	},
	renderStatus ()
	{
		let text;
		if (this.model.get('end')) {
			text = "TBD. Level end.";
			const kpisModel = this.model.get('kpisModel');
			const mosquitoes = kpisModel.get('mosquitoes');
			const infectiousMosquitoes = kpisModel.get('infectiousMosquitoes');
			const infectedHuman = kpisModel.get('infectedHuman');
			let congratsMsg = `Congrats! You finished the level! #Mosquitoes =${mosquitoes} #InfectiousMosquitoes =${infectiousMosquitoes} #Ill People =${infectedHuman} `;
			alert(congratsMsg);
		} else if (this.model.get('loading')) {
			text = TEXTS.topPanel.runState;
		} else {
			text = TEXTS.topPanel.pauseState;
		}
		this.$mainStatus.text(text);
	},

	playPauseClick ()
	{
		if (this.model.get('play')) {
			this.pause();
		} else {
			this.startPlay(9999);
		}
	},

	nextDayClick ()
	{
		this.model.incDay();
	},

	pause ()
	{
		this.model.set('play', false);
		this.$playPauseButton.removeClass('playing').attr('aria-label', TEXTS.topPanel.play);
	},

	startPlay (max)
	{
		this.model.set('play', true);
		this.$playPauseButton.addClass('playing').attr('aria-label', TEXTS.topPanel.pause);
		const incDay = ()=> {
			max--;
			if (max === 0) {
				this.pause();
			}
			else if (this.model.get('play')) {
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
