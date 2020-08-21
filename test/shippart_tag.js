

tagScriptAliasConversions = {
	weapons: {
		"Heavy Point Defence Turret": "Hpd",
		"Point Defence": "PD",

		"Light Beam": "LB",
		"Auto Cannon": "AC",
		"Fusion Ring": "Ring",
		"Heavy Flak": "Flak",
		"Phase Bomb Launcher": "Phase",
		"Artillery Gun": "Arty",
		"Tesla Turret": "Tesla",
		"Plasma Turret": "Plasma",
		"Heavy Beam": "HB",
		"Missile Launcher": "Missile",
		"Torpedo Launcher": "Torp",
		"EMP Gun": "EMP",
		"Sidewinder Missile": "SW",
		"Flamethrower": "Flame",
		"Orb Launcher": "Orb",

		"Gravity Push Wave": "Push",
		"Gravity Pull Wave": "Pull"
	},
	utilities: {
		"Cloak Generator": "Cloak",
		"Stasis Field": "Stasis",

		"Heavy Shield Generator": "Shield",
		"Advanced Shield Generator": "Shield",
		"Shield Capacitor": "Shield",

		"EMP Warhead": "EMP",
		"Explosive Warhead": "Explosive",
		"Shaped Warhead": "Shaped"
	},
	armor: {
		"Heavyweight Armor": "HW",
		"Volumetric Armor": "Volum",
		"Ultralight Armor": "Ultra"
	},
	engines: {
		"Bulk Thruster": "[Bulk]",
		"Large Bulk Thruster": "[Bulk]",
		"Compact Cruiser Thruster": "[Cruiser]",
		"Cruiser Thruster": "[Cruiser]",
		"Fighter Thruster": "[Fighter]",
		"Scout Thruster": "[Scout]",
		"Interceptor Afterburner": "[AB]"
	}
}

setTags = () => {
	let unit = designMode.unit,
		string = "";
	getTags = (object, which) => {
		for (let item of object) {
			let query = tagScriptAliasConversions[which][item.name];
			if (query !== undefined && string.indexOf(query) == -1)
				string += `${query} `
		}
	}

	getTags(unit.weapons, "weapons");
	getTags(unit.parts, "utilities");
	getTags(unit.parts, "armor");
	getTags(unit.parts, "engines");

	designMode.unit.name = string.slice(0, 50);
	designMode.save();
}

setFleetTags = () => {
	let tracker = buildBar.selected;
	for (let i = 0; i < 10; i++) {
		designMode.select(i);
		setTags();
	}
	designMode.select(tracker);
}

document.body.addEventListener("keydown", e => {
	if (e.key == "?")
		setFleetTags();
})
