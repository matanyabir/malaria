const DialogView = Backbone.View.extend({

	className: 'dialog-box-overlay',

	render ()
	{
		const title = this.model.get('title');
		const text = this.model.get('text');
		const buttons = this.model.get('buttons');
		const $title = $('<div class="dialog-title"></div>').text(title);
		const $text= $('<div class="dialog-text"></div>').text(text);
		const $btns = $('<div class="buttons-container"></div>');
		buttons.forEach((btn) => {
			const $btn = $('<button class="button"></button>');
			$btn.text(btn.text);
			$btn.click(()=>{
				if (this.model.get('fadeOut')){
					return;
				}
				this.model.set('fadeOut', true);
				this.$el.removeClass('on');
				// for the animation:
				setTimeout(()=>{
					btn.cb();
					this.remove();
				}, 300);
			});
			$btns.append($btn);
		});
		const $dialog = $('<div class="dialog-box"></div>').append($title).append($text).append($btns);
		this.$el.html($dialog);
		// for the animation:
		setTimeout(()=>{
			this.$el.addClass('on');
		}, 0);
		return this;
	}
});
