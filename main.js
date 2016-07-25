// ウロボロスのためのライブラリ
require('~project/PEpjSTks6bpUJ1D5XhTI3C1RB4riajif/*');

// Game start
game.onload = function () {
	var enableBeam = false;
	
	// 最初に表示するマップを変える
	var map = Hack.maps['map1'];
	map.load();
	
	// Map1
	Hack.openExternal('https://www.youtube.com/watch?v=VRRPlMFXI0g');
	
	// アイテムになった魔道書
	var item1 = new RPGObject();
	item1.mod(Hack.assets.enchantBookItem);
	item1.locate(7, 5);
	item1.onplayerenter = function	() {
		this.destroy();
		Hack.hint = function () {
			// よくぞ来た、勇者よ。
			// ドラゴンに囚われている姫を助けてくれ。
			// さあ、ワープから冒険に旅立つのだ。
		};
		// ワープ
		var item2 = new RPGObject();
		item2.mod(Hack.assets.warp);
		item2.locate(14, 5, 'map1');
		item2.layer = RPGMap.Layer.Under;
		item2.onplayerenter = function () {
			Hack.changeMap('map2');
			Hack.openExternal('https://www.youtube.com/watch?v=Lw8IMgt2zPA');
		};
	}
	
	// Map2
	
	// インセクト
	var enemy1 = new RPGObject();
	enemy1.mod(Hack.assets.insect);
	enemy1.hp = 1;
	enemy1.atk = 1;
	enemy1.locate(3, 8, 'map2');
	enemy1.onbecomeidle = function () {
		this.turn();
		this.walk();
	};
	enemy1.onbecomedead = function () {
		Hack.score += 1;
		// ワープ
		var item3 = new RPGObject();
		item3.mod(Hack.assets.warp);
		item3.locate(1, 8, 'map2');
		item3.layer = RPGMap.Layer.Under;
		item3.onplayerenter = function () {
			Hack.changeMap('map3');
		};
	};
	
	// Map3
	
	// スライム
	var enemy2 = new RPGObject();
	enemy2.mod(Hack.assets.slime);
	enemy2.hp = 2;
	enemy2.atk = 1;
	enemy2.locate(7, 4, 'map3');
	enemy2.onbecomeidle = function () {
		this.attack();
	};
	enemy2.onbecomedead = function () {
		Hack.score += 2;
		
		// ハート
		var item7 = new RPGObject();
		item7.mod(Hack.assets.heart);
		item7.locate(7, 4, 'map3');
		item7.onplayerenter = function () {
			Hack.player.hp += 2;
			this.destroy();
		};
	};
	
	// どうくつ
	var item4 = new RPGObject();
	item4.mod(Hack.assets.caveGate);
	item4.locate(13, 7, 'map3');
	item4.onplayerenter = function () {
		Hack.changeMap('map4');
		Hack.openExternal('https://www.youtube.com/watch?v=HjS151Gh8Q8');
	};
	
	// Map4
	
	// コウモリ
	var enemy3 = new Bat();
	enemy3.hp = 3;
	enemy3.atk = 1;
	enemy3.mod(Hack.assets.bat);
	enemy3.locate(7, 6, 'map4');
	enemy3.onbecomeidle = function () {
		var target = Hack.player;
		var moveX = 32 * Math.sign(target.mapX - this.mapX);
		var moveY = 32 * Math.sign(target.mapY - this.mapY);
		this.direction = moveX;
		this.tl.become('walk').moveBy(moveX, moveY, 30).then(function () {
			Hack.Attack.call(this, this.mapX, this.mapY, this.atk);
		}).become('attack', 20).become('idle');
	};
	enemy3.onbecomedead = function () {
		Hack.score += 3;
		
		// ハート
		var item5 = new RPGObject();
		item5.mod(Hack.assets.heart);
		item5.locate(7, 5, 'map4');
		item5.onplayerenter = function () {
			Hack.player.hp += 3;
			this.destroy();
		};
		// かいだん
		var item6 = new RPGObject();
		item6.mod(Hack.assets.upStair);
		item6.locate(1, 8, 'map4');
		item6.layer = RPGMap.Layer.Under;
		item6.onplayerenter = function () {
			Hack.changeMap('map5');
			Hack.openExternal('https://www.youtube.com/watch?v=3TV3mVLqmpU');
		};
	};
	
	// Map5
	
	// ウロボロス
	var enemy4 = new Bat();
	enemy4.hp = 5;
	enemy4.atk = 1;
	enemy4.locate(1, 5, 'map5');
	enemy4.onbecomeidle = function () {
		var target = Hack.player;
		if (!target) return;
		var moveX = 32 * Math.sign(target.mapX - this.mapX);
		var moveY = 32 * Math.sign(target.mapY - this.mapY);
		this.direction = moveX;
		this.tl.become('walk').moveBy(moveX, moveY, 30).then(function () {
			Hack.Attack.call(this, this.mapX, this.mapY, this.atk);
		}).become('attack', 20).become('idle');
	};
	enemy4.onbecomedead = function () {
		Hack.score += 5;
		
		enableBeam = true;
		Hack.log('中ボスのウロボロスを倒した！攻撃をするとビームを打てるようになった！');
		setTimeout(function() {
			Hack.clearLog();
			Hack.textarea.hide();
		}, 5000);
		
		// ハート
		var item8 = new RPGObject();
		item8.mod(Hack.assets.heart);
		item8.locate(this.mapX, this.mapY, 'map5');
		item8.onplayerenter = function () {
			Hack.player.hp += 2;
			this.destroy();
		};
	};
	enemy4.mod(Hack.assets.ouroboros);
	
	// ワープ
	var item9 = new RPGObject();
	item9.mod(Hack.assets.warp);
	item9.locate(1, 5, 'map5');
	item9.layer = RPGMap.Layer.Under;
	item9.onplayerenter = function () {
		Hack.changeMap('map6');
		Hack.openExternal('https://www.youtube.com/watch?v=HjS151Gh8Q8');
	};
	
	// Map6
	
	var openBox = false;
	var clearInsect = false;
	var clearBat = false;
	
	// インセクト
	var enemy5 = new RPGObject();
	enemy5.mod(Hack.assets.insect);
	enemy5.hp = 2;
	enemy5.atk = 1;
	enemy5.locate(3, 4, 'map6');
	enemy5.onbecomeidle = function () {
		this.turn();
		this.walk();
	};
	enemy5.onbecomedead = function () {
		Hack.score += 2;
		clearIncect = true;
		if (clearBat) {
			// かぎ
			var item10 = new RPGObject();
			item10.mod(Hack.assets.key);
			item10.locate(7, 3, 'map6');
			item10.onplayerenter = function () {
				Hack.log('カチャリ という おと が きこえた');
				setTimeout(function() {
					Hack.clearLog();
					Hack.textarea.hide();
				}, 5000);
				openBox = true;
				this.destroy();
			};
		}
	};
	
	// コウモリ
	var enemy6 = new Bat();
	enemy6.hp = 3;
	enemy6.atk = 1;
	enemy6.mod(Hack.assets.bat);
	enemy6.locate(11, 4, 'map6');
	enemy6.onbecomeidle = function () {
		var target = Hack.player;
		var moveX = 32 * Math.sign(target.mapX - this.mapX);
		var moveY = 32 * Math.sign(target.mapY - this.mapY);
		this.direction = moveX;
		this.tl.become('walk').moveBy(moveX, moveY, 30).then(function () {
			Hack.Attack.call(this, this.mapX, this.mapY, this.atk);
		}).become('attack', 20).become('idle');
	};
	enemy6.onbecomedead = function () {
		Hack.score += 3;
		clearBat = true;
		if (clearInsect) {
			// かぎ
			var item10 = new RPGObject();
			item10.mod(Hack.assets.key);
			item10.locate(7, 3, 'map6');
			item10.onplayerenter = function () {
				Hack.log('カチャリ という おと が きこえた');
				setTimeout(function() {
					Hack.clearLog();
					Hack.textarea.hide();
				}, 5000);
				openBox = true;
				this.destroy();
			};
		}
	};
	
	// かたいたからばこ
	var item11 = new RPGObject();
	item11.mod(Hack.assets.box);
	item11.locate(7, 6, 'map6');
	item11.onattacked = function () {
		if (openBox) {
			this.destroy();
			// this.mod(Hack.assets.openedBox);
			Hack.log('ガチャ！たからばこが あいた！');
			setTimeout(function() {
				Hack.clearLog();
				Hack.textarea.hide();
			}, 5000);
			// 出てくるもの　→
			// ハート
			var item12 = new RPGObject();
			item12.mod(Hack.assets.heart);
			item12.locate(7, 6, 'map6');
			item12.onplayerenter = function () {
				Hack.player.hp += 9;
				this.destroy();
			};
		} else {
			Hack.log('たからばこは びくともしない ');
			setTimeout(function() {
				Hack.clearLog();
				Hack.textarea.hide();
			}, 5000);
		}
	};
	
	// かいだん
	var item13 = new RPGObject();
	item13.mod(Hack.assets.upStair);
	item13.locate(1, 3, 'map6');
	item13.layer = RPGMap.Layer.Under;
	item13.onplayerenter = function () {
		Hack.changeMap('map7');
		Hack.openExternal('https://www.youtube.com/watch?v=6tejXdMRXww');
	};
	
	// Map7
	
	// ドラゴン
	var enemy7 = new RPGObject();
	enemy7.mod(Hack.assets.dragon);
	enemy7.hp = 10;
	enemy7.atk = 1;
	enemy7.locate(12, 8, 'map7');
	enemy7.scale(2, 2);
	enemy7.setFrame('Idle', [10]);
	enemy7.onbecomeidle = function () {
		var target = Hack.player;
		if (!target) return;
		var moveX = 32 * Math.sign(target.mapX - this.mapX);
		var moveY = 32 * Math.sign(target.mapY - this.mapY);
		this.direction = moveX;
		this.tl.become('walk').moveBy(moveX, moveY, 30).then(function () {
			Hack.Attack.call(this, this.mapX, this.mapY, this.atk);
		}).become('attack', 20).become('idle');
	};
	enemy7.onbecomedead = function () {
		Hack.score += 10;
		Hack.openExternal('https://www.youtube.com/watch?v=a7ai08D1rbo');
		
		// 姫
		var chara1 = new RPGObject();
		chara1.mod(Hack.assets.woman);
		chara1.locate(this.mapX, this.mapY, 'map7');
		chara1.oncollided = function () {
			Hack.textarea.height = 55;
			Hack.log('勇者さん、ドラゴンから助けてくれてありがとうございます。これで世界に平和が戻りました。');
			setTimeout(function() {
				Hack.gameclear();
			}, 3000);
		};
	};
	enemy7.setInterval(function () {
		// ばくえん
		var effect1 = new Effect(-5, 5, 40, true);
		effect1.collisionFlag = false;
		effect1.locate(this.mapX - 2, this.mapY - 1);
		effect1.force(0.1, -0.1);
		effect1.ontriggerenter = function (event) {
			Hack.Attack.call(this, event.mapX, event.mapY, 1);
		};
	}, 1);
	
	// ( Keep this line -- ここはけさないでね ) //
	
	// プレイヤー（騎士）
	var player = Hack.player = new Player();
	player.mod(Hack.assets.knight);
	player.locate(1, 3);
	player.hp = 3;
	player.atk = 1;
	player.onbecomedead = function () {
		this.destroy();
		Hack.gameover();
	};
	player.onbecomeattack = function () {
		if (!enableBeam) return;
		
		var beam = new MapObject('beam');
		beam.locate(this.mapX, this.mapY);
		var speed = 10;
		var muki = this.forward;
		beam.velocity(speed * muki.x, speed * muki.y);
		beam.collisionFlag = false;
		beam.ontriggerenter = function (event) {
			if (Hack.player !== event.hit) {
				Hack.Attack.call(this, event.mapX, event.mapY, 1);
			}
		};
	};
};

// Before game start
Hack.onload = function () {
	
	MapObject.dictionary = {
		clay: 320,		clayWall: 340,	clayFloor: 323,
		stone: 321,		stoneWall: 341,	stoneFloor: 342,
		warp: 324,		warpRed: 325,
		warpGreen: 326,	warpYellow: 327,
		magic: 328,		usedMagic: 329,
		pot: 400,		rock: 401,		upStair: 402,
		box: 420,		flower: 421,	downStair: 422,
		trap: 440,		usedTrap: 441,	step: 442,
		castle: 500,	village: 501,	caveGate: 502,
		tree: 520,		table: 521,		openedBox: 522,
		beam: 540,		diamond: 560,	sapphire: 561,
		ruby: 562,		heart: 563,		skull: 564,
		coin: 565,		star: 566,		key: 567,
		bomb: 580,		coldBomb: 581,	egg: 582,
		poo: 583,
		sandySoil: 45, claySoil: 323,
		grassland: 322,	waterside: 205,
		flatGray: 135, squareGray: 93,
	};
	
	Hack.maps = {};
	
	// map1
	Hack.maps['map1'] = new RPGMap(32, 32);
	Hack.maps['map1'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map1'].bmap.loadData([
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322]
	]);
	Hack.maps['map1'].cmap = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
	];
	
	// map2
	Hack.maps['map2'] = new RPGMap(32, 32);
	Hack.maps['map2'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map2'].bmap.loadData([
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322]
	]);
	Hack.maps['map2'].cmap = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
	];
	
	// map3
	Hack.maps['map3'] = new RPGMap(32, 32);
	Hack.maps['map3'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map3'].bmap.loadData([
		[205,205,205,205,205,205,205,205,205,205,205,205,205,205,205],
		[205,205,205,205,205,205,205,205,205,205,205,225,225,225,205],
		[205,205,205,205,205,205,205,205,205,205,206,322,322,322,204],
		[205,225,225,225,225,225,225,225,225,225,226,322,322,322,204],
		[206,322,322,322,322,322,322,322,322,322,322,322,322,322,204],
		[206,322,184,185,185,185,185,185,185,185,186,322,322,322,204],
		[206,322,204,205,205,205,205,205,205,205,206,322,322,322,204],
		[206,322,204,205,205,205,205,205,205,205,206,322,322,322,204],
		[206,322,204,205,205,205,205,205,205,205,205,185,185,185,205],
		[205,185,205,205,205,205,205,205,205,205,205,205,205,205,205]
	]);
	Hack.maps['map3'].cmap = [
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1],
		[  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
	];
	
	// map4
	Hack.maps['map4'] = new RPGMap(32, 32);
	Hack.maps['map4'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map4'].bmap.loadData([
		[320,320,320,320,320,320,320,320,320,320,320,320,320,320,320],
		[320,323,323,323,323,323,323,323,323,323,323,323,323,323,320],
		[320,323,320,320,320,320,320,323,320,320,320,320,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,323,320,323,323,323,323,323,323,323,323,323,320,323,320],
		[320,320,320,320,320,320,320,320,320,320,320,320,320,320,320]
	]);
	Hack.maps['map4'].cmap = [
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
		[  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
	];
	
	// map5
	Hack.maps['map5'] = new RPGMap(32, 32);
	Hack.maps['map5'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map5'].bmap.loadData([
		[ 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 44, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46],
		[ 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 66]
	]);
	Hack.maps['map5'].cmap = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
	];
	
	// map6
	Hack.maps['map6'] = new RPGMap(32, 32);
	Hack.maps['map6'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map6'].bmap.loadData([
		[321,341,341,341,341,341,341,341,341,341,341,341,341,341,321],
		[321,135,135,135,135,135,135,135,135,135,135,135,135,135,321],
		[321,135,321,341,341,341,341,135,341,341,341,341,321,135,321],
		[321,135,321,135,135,135,135,135,135,135,135,135,321,135,321],
		[321,341,321,135,135,135,135,135,135,135,135,135,321,135,321],
		[321,135,321,135,135,135,135,135,135,135,135,135,321,135,321],
		[321,135,321,135,135,135,135,135,135,135,135,135,321,135,321],
		[321,135,341,341,341,341,341,341,341,341,341,341,341,135,321],
		[321,135,135,135,135,135,135,135,135,135,135,135,135,135,321],
		[321,321,321,321,321,321,321,321,321,321,321,321,321,321,321]
	]);
	Hack.maps['map6'].cmap = [
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
		[  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
		[  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1],
		[  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
		[  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
	];
	
	// map7
	Hack.maps['map7'] = new RPGMap(32, 32);
	Hack.maps['map7'].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps['map7'].bmap.loadData([
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
		[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322]
	]);
	Hack.maps['map7'].cmap = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
	];
	
	// < Keep this line -- ここはけさないでね > //
	
};

// Score up/Score down
Hack.onscorechange = function () {
	
	// [ Keep this line -- ここはけさないでね ] //
	
};
