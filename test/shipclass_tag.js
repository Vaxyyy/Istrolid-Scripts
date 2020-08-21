setTags = () => {
    string = "";
    shipClass = classifyShip()
    string += shipClass;
    designMode.unit.name = string.slice(0, 50);
    designMode.save();
}
classifyShip = function () {
    let unit = designMode.unit
    if (unit.hp === 5) return ``
    if (unit.warhead) {
        return "nuke";
    }
    if (unit.weaponDPS === 0) {
        if (unit.energyCaster) {
            return "carrier";
        }
        if (unit.maxSpeed * 16 > 300) {
            return "scout";
        } else {
            return "brick";
        }
    }
    //kites
    if (unit.mainWeapon.arc === 360 && (unit.mainWeapon.range > 800 || unit.maxRange > 1500)) {
        if (unit.maxSpeed * 16 < 100) {
            return "hkite";
        }
        if (unit.maxShield > 140) {
            return "skite";
        }
        if (unit.moveEnergy * 16 > 2500) {
            return "ABkite";
        } else {
            return "kite";
        }
    }
    //other
    if (unit.maxShield > 300) {
        return "shieldTank";
    }
    if (unit.maxSpeed * 16 > 250 && unit.maxRange > 800 && unit.jumpCount > 0) {
        return "blimp";
    }

    //rings and bombs
    if (unit.maxSpeed * 16 > 500 && unit.weaponDamage > 150 && unit.mainWeapon.name === `Fusion Ring`) {
        return "interceptor";
    }
    if (unit.maxSpeed * 16 > 100 && unit.weaponDamage > 150 && unit.mainWeapon.name === `Fusion Ring`) {
        return "interceptorSlow";
    }
    if (unit.maxSpeed * 16 > 200 && unit.cost < 500 && (unit.mainWeapon.name === `Phase Bomb Launcher` || unit.mainWeapon.name === `Fusion Ring`)) {
        return "bomber";
    }

    //tanks
    if (unit.cost < 400 && unit.hp > 320 && unit.maxRange > 1200 && unit.mainWeapon.arc !== 360) {
        return "mini tank";
    }
    if (unit.cost > 900 && unit.hp > 1800 && unit.maxRange > 1200 && unit.mainWeapon.arc !== 360) {
        return "titan";
    }
    if (unit.cost > 400 && unit.hp > 800 && unit.maxRange > 1200 && unit.mainWeapon.arc !== 360) {
        return "tank";
    }
    //allround
    if (unit.maxSpeed * 16 > 70 && unit.maxRange > 899) {
        return "cruiser";
    }
    if (unit.maxSpeed * 16 > 50 && unit.weaponDPS * 16 > 100 && unit.maxRange > 1000) {
        return "destroyer";
    }
    if (unit.maxSpeed * 16 > 200 && unit.cost < 150) {
        return "fighter";
    }
    if (unit.cost > 800 && unit.hp > 1000) {
        return "battleship";
    }
    //slayer
    if (unit.cost > 500 && unit.hp > 500 && (unit.weaponDPS * 16 > 80 && unit.weaponDPS * 16 < 180)) {
        return "mini slayer";
    }
    if (unit.cost > 800 && unit.hp > 500 && unit.weaponDPS * 16 > 180) {
        return "slayer";
    }
    if (unit.energyCaster) {
        return "carrier";
    }
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
