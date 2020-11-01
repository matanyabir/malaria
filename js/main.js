$(document).ready(function ()
{
	const levelModel = new LevelModel({id:"1"});
	levelModel.loadData();
	const levelView = new LevelView({model: levelModel});
	$('#level-container').html(levelView.render().$el);
});
