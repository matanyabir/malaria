$(document).ready(function ()
{
	const levelModel = new LevelModel({});
	levelModel.loadData();
	const model = levelModel.get("map");
	const panelView = new TopPanelView({model: model});
	const sideBarView = new SideBarView({model: model});
	const mapView = new MapView({model: model});
	$('#top-panel').html(panelView.render().$el);
	$('#side-bar').html(sideBarView.render().$el);
	$('#map-container').html(mapView.render().$el);
});
