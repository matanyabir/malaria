const HeatMapView = Backbone.View.extend({
	className: 'heat-map',
	initialize ()
	{
		this.model.on('change:mosquitoes', this.renderMosquitoes, this);
		return this;
	},
	render: function ()
	{
		const mosquitoes = this.model.get('mosquitoes');
		if (mosquitoes) {
			this.renderMosquitoes();
		} else {
			this.model.loadMosquitoes();
		}

		return this;
	},

	renderMosquitoes: function ()
	{
		this.$el.html('');
		const mosquitoes = this.model.get('mosquitoes');
		if (mosquitoes) {
			mosquitoes.forEach(mos => {
				const $mos = $('<div class="mosquito"></div>');
				const left = mos.x;
				const top = mos.y;
				$mos.css({left, top});
				if (mos.c) {
					const size = (mos.c / 2) + "px";
					const width = size;
					const height = size;
					const borderRadius = size;
					$mos.css({width, height, borderRadius});
				}
				this.$el.append($mos);
			});
		}
	},


});
