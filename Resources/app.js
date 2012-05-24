(function(){
	Ti.UI.setBackgroundColor('#222222');
	
	var tab_group = Ti.UI.createTabGroup();
	var win_base = Ti.UI.createWindow({
		backgroundImage: 'images/background.png',
		navBarHidden: true,
		tabBarHidden: true,
	});
	
	// Demo 1
	var win1 = Ti.UI.createWindow({ title: 'List No.1', height: 460, top: 0, backgroundColor: '#111111', });
	var win2 = Ti.UI.createWindow({ title: 'List No.2', height: 460, top: 0, backgroundColor: '#111111', });
	var win3 = Ti.UI.createWindow({ title: 'Setting', height: 460, top: 0, backgroundColor: '#111111', });
	var list1 = createRows();
	var list2 = createRows();
	win1.add(list1);
	win2.add(list2);
	var fathm_like_view = require('ui/FathmLikeView').createFathmLikeView({
  		windows: [win1, win2, win3],
	});
	win_base.add(fathm_like_view);
	
	//// Demo 2 - vertical scroll (reference: http://ninotk.oops.jp/weblog/?p=198)
	// var win1 = Ti.UI.createWindow({ title: 'List No.1', height: 460, width: 320, top: 0, backgroundColor: '#111111', });
	// var win2 = Ti.UI.createWindow({ title: 'List No.2', height: 460, width: 320, top: 0, backgroundColor: '#111111', });
	// var win3 = Ti.UI.createWindow({ title: 'List No.3', height: 460, width: 320, top: 0, backgroundColor: '#111111', });
	// var win4 = Ti.UI.createWindow({ title: 'Setting', height: 460, width: 320, top: 0, backgroundColor: '#111111', });
	// var win5 = Ti.UI.createWindow({ title: 'About', height: 460, width: 320, top: 0, backgroundColor: '#111111', });
	// var list1 = createRows();
	// var list2 = createRows();
	// var list3 = createRows();
	// win1.add(list1);
	// win2.add(list2);
	// win3.add(list3);
	// var fathm_like_view1 = require('ui/FathmLikeView').createFathmLikeView({
  		// windows: [win1, win2, win3],
	// });
	// fathm_like_view1.transform = Ti.UI.create2DMatrix().rotate(-90);
	// var fathm_like_view2 = require('ui/FathmLikeView').createFathmLikeView({
  		// windows: [win4, win5],
	// });
	// fathm_like_view2.transform = Ti.UI.create2DMatrix().rotate(-90);
	// var views = [fathm_like_view1, fathm_like_view2]
	// var scroll_view = Ti.UI.createScrollableView({
		// top: 0,
		// left: -80,
		// width: 480,
		// height: 480,
		// transform: Ti.UI.create2DMatrix().rotate(90),
		// views: views,
	// });
	// win_base.add(scroll_view);
	
	// open tabs
	var tab = Ti.UI.createTab({ window: win_base });
	tab_group.addTab(tab);
	tab_group.open();
})();

function createRows(){
	var rows = [];
	// ヘッダー行を追加
	var header = Ti.UI.createTableViewRow({ height: 40, });
	rows.push(header);
	// 行の追加
	for (var i = 0; i < 10; i++){
		var row = Ti.UI.createTableViewRow({ height: 60, });
		var label_number = Ti.UI.createLabel({
			bottom: 0,
			left: 0,
			width: 60,
			height: 35,
			color: '#888888',
			  font: { fontSize: 20, fontFamily: 'Didact Gothic', },
			textAlign: 'center',
			text: 'NO.' + i,
		});
		row.add(label_number);
		rows.push(row);
	}
	self = Ti.UI.createTableView({
		backgroundColor: '#111111',
		separatorColor: '#666666',
		data: rows,
	});
	return self;
}