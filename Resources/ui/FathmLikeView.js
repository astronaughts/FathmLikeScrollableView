exports.createFathmLikeView = function(params) {
  var self = Ti.UI.createView();
  var windows = params.windows;
	var title = Ti.UI.createLabel({
		top: 45,
		width: 320,
		color: '#FFFFFF',
		  font: { fontSize: 22, fontFamily: 'Didact Gothic', } ,
		textAlign: 'center',
		text: windows[0].title, // 最初のウィンドウのタイトルを設定
	});
	var scroll_view = Ti.UI.createScrollableView({
		height: 460,
	  showPagingControl: true,
	  pagingControlColor: 'transparent',
	  pagingControlHeight: 100,
	  views: windows,
	});
	scroll_view.addEventListener('scroll', function(e){
		// タイトルを変更
		if (e.view != undefined)
			title.text = e.view.title;
	});
  
  // 各ウィンドウの処理
  for (key in windows) {
  	var win = windows[key];
  	// ウィンドウを縮小表示
  	win.transform = Ti.UI.create2DMatrix().scale(0.6);
  	// タッチ時の判定用にカバー（＝透明の View）を用意する
  	// カバーとウィンドウを紐付ける
  	var cover = Ti.UI.createView({ parentWindow: win, });
  	win.add(cover);
  	cover.show(); // show しないと visible が null（汗
  	
  	// カバーのタッチ時イベント
  	cover.addEventListener('touchend', function(e){
  		var that = this;
  		// カバーが表示されていたらスルー
  		if (! that.visible) return;
  		// カバーを非表示にする
  		that.hide();
  		// ScrollableView やタイトルを隠す
  		scroll_view.scrollingEnabled = false;
  		// height: 560 = scroll_view.height + scroll_view.pagingControlHeight
			scroll_view.animate({ top: 0, height: 560, duration: 300, });
			// top: -45 = title.top * (-1)
			title.animate({ top: -45, duration: 300, });
			
  		// メニューを用意する
  		var menu = createMenu();		  
  		// メニューの戻るボタンのタッチ時のイベント
  		menu.returnButton.addEventListener('click', function(e){
  			// メニューの非表示と破棄
  			menu.animate({ top: -40, duration: 300, }, function(){
  				that.parentWindow.remove(menu);
  				menu = null;
  				// ScrollableView やタイトルの表示
  				scroll_view.scrollingEnabled = true;
  				// 元の位置へ
					scroll_view.animate({ height: 460, duration: 300, });
					title.animate({ top: 45, duration: 300, });
  				// ウィンドウの縮小
  				that.parentWindow.animate({ transform: Ti.UI.create2DMatrix().scale(0.6), duration: 300, });
  			});
  			// カバーを表示する
  			that.show();
  		});
  		
		  // ウィンドウを拡大表示させ、メニューを表示する
		  that.parentWindow.animate({ transform: Ti.UI.create2DMatrix().scale(1), duration: 300, }, function(){
		  	that.parentWindow.add(menu);
		  	menu.animate({ top: 0, duration: 300, });
		  });
		});
  }
  
  self.add(title);
  self.add(scroll_view);
  return self;
};

function createMenu() {
	var self = Ti.UI.createView({
		top: -40,
		height: 40,
		backgroundImage: 'images/menu-background.png',
		opacity: 0.85,
  });
  var return_button = Ti.UI.createButton({
		right: 0,
		width: 40,
		height: 40,
		backgroundImage: 'images/button-off.png',
		backgroundSelectedImage: 'images/button-on.png',
  });
  self.add(return_button);
  self.returnButton = return_button;
  return self;
}