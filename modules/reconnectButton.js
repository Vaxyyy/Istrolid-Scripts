(function () {
	var vtMod, getValues, bar, data, window_body_orig;

	eval(onecup['import']());

	vtMod = window.valueTrackerMod = {};

	vtMod.draw = function () {
		return bar();
	};

	vtMod.players = {};

	getValues = function () {
		for (let i = 0; i < sim.players.length; i++) {
			let player = sim.players[i]
			let p = vtMod.players[player.number] = player;
			p.unitValue = 0;
			p.eco = 10; 
		};

		for (let i in intp.things) {
			let thing = intp.things[i],
				player;
			if (thing.commandPoint) {
				for (let i in vtMod.players) {
					let p = vtMod.players[i];
					if (p.side == thing.side) player = p;
				};
				if (!player) continue;
				player.eco++;
			}
		};

		for (let i in intp.things) {
			let thing = intp.things[i],
				player;
			if (vtMod.players[thing.owner]) player = vtMod.players[thing.owner];
			if (!player || thing.side !== player.side) continue;
			if (thing.unit) player.unitValue += thing.cost;
		};
	};

	bar = function () {
		return div(function () {
			background_color('rgba(0,0,0,.3)');
			transform('translate(-50%, 0%)');
			display("inline-block");
			position("relative");
			left('50%');
			height(112);
			width(400);
			top(64);
			return data()
		});
	};

	data = function () {
		if (sim.serverType == "1v1" || sim.serverType == "1v1r" || sim.serverType == "1v1t" || sim.serverType == "2v2" || sim.serverType == "3v3") {
			for (let i in vtMod.players) {
				let player = vtMod.players[i];
				if (player.side == "spectators") continue;
				div(function () {
					
					if (player.name == commander.name) {
						color('white')
					} else {
						color('rgba(255,255,255,.6)')
					}
					text(`${player.name} | money ${player.money} | value ${player.unitValue} | eco ${player.eco}`)
				});
			};
		}
	};

	setInterval(() => {
		getValues()
	}, 125);

	window_body_orig = window.body;

	window.body = function () {
		if (ui.mode === 'battle') {
			vtMod.draw();
		}
		return window_body_orig.call(this);
	};
}).call(this);
