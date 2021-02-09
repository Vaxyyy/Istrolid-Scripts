/*
 * This is an Fleet Classifier for istrolid ships
 *
 * How to use:
 * when in design mode press what key "Classifier" is set to, (defule is "?").
 * it will replace all names of your ships.
 */

// ----------------| What it classes |---------------- \\

/*
 * unarmed:
 *  | nukes:
 *      - emp,
 *      - impact / intercepter,
 *      - aoe;
 *  | shield,
 *  | capper,
 *  | target,
 *  | mini-interceptor,
 * --------
 * lancer;
 * --------
 * fighters:
 *  - preme
 *  - minimal fighter,
 *  - h-fighter,
 *  - fighter;
 * --------
 * sub;
 * --------
 * mine;
 * --------
 * yoink-bomb;
 * --------
 * bomber:
 *  - ring,
 *  - phase;
 * --------
 * kev-shield;
 * --------
 * kites:
 *  - h-kite,
 *  - shield-kite,
 *  - platform,
 *  - kite;
 * --------
 */

// ----------------| What it will class |---------------- \\

/*
 * tanks:
 *  - brick,
 *  - titan,
 *  - dreadnought,
 *  - battleship,
 *  - frigate,
 *  - destroyer,
 *  - brawler,
 *  - building;
 * --------
 * cruiser,
 * battlecruiser;
 * --------
 * interceptor,
 * corvette,
 * --------
 * boat;
 * --------
 * scout;
 * --------
 * blimp;
 * --------
 * slayer,
 * mini-slayer;
 * --------
 * carriers: 
 *  - stuff;
 * --------
 */

(function () {
    var classifyShip, shipsClass, setFleetClasses, window_onkeydown_orig;

    eval(onecup["import"]());

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    classifyShip = function () {
        var u, _parts, ship_Name, has, inRange, weapon_Names, wepons_Sorted, wepons_Sorted_NOPD, count;

        u = designMode.unit;
        if (u.hp === 5) return "";
        _parts = new Object();
        ship_Name = "";

        u.parts.forEach(part => {
            if (part.name === "Insignia" || part.name === "Lettering" || part.name === "Stripe") return;
            if (_parts[part.name] === undefined) _parts[part.name] = 1;
            else _parts[part.name]++;
        });

        has = function (parts_array) {
            if (Array.isArray(parts_array)) {
                let i, j, part, part_, array, found;
                found = false
                for (i = 0; i < parts_array.length; i++) {
                    part = parts_array[i];
                    if (part.includes(" || ")) {
                        array = part.split(" || ");
                        for (j = 0; j < array.length; j++) {
                            part_ = array[j];
                            if (!found) {
                                if (part_.charAt(0) === "!") {
                                    if (!_parts[part_.substring(1)]) {
                                        found = true;
                                        continue;
                                    }
                                } else if (_parts[part_]) {
                                    found = true;
                                    continue;
                                }
                            } else continue;
                        }
                        if (!found) {
                            return false;
                        }
                        continue;
                    } else if (part.charAt(0) === "!") {
                        if (!_parts[part.substring(1)]) {
                            continue;
                        } else return false;
                    } else if (_parts[part]) {
                        continue;
                    } else return false;
                };
                return true;
            } else if (typeof parts_array === "string") {
                if (parts_array.charAt(0) === "!") {
                    if (!_parts[parts_array.substring(1)]) {
                        return true;
                    } else return false;
                } else if (_parts[parts_array]) {
                    return true;
                } else return false;
            }
            return false;
        };

        inRange = function (vaule, min, max) {
            if (vaule > min && vaule < max) {
                return true;
            } else return false;
        };

        u.speed = u.maxSpeed * 16;
        u.genEnergy = u.genEnergy * 16;
        u.genShield = u.genShield * 16;
        u.turnSpeed = u.turnSpeed * 180 / Math.PI * 16;
        u.cloakTime = u.mass / (66 * _parts["Cloak Generator"]);
        if (u.weapons.length > 0) {
            u.reloadTime = u.mainWeapon.reloadTime / 16;
            u.burst = Math.round(u.weapons.map(x => x.damage).reduce((a, b) => a + b, 0));
        }

        if (has("Cloak Generator")) {
            ship_Name += "cloak ";
        };

        if (has("Energy Transfer")) {
            ship_Name += "carrier ";
        }

        if (has("Stasis Field")) {
            ship_Name += "stasis ";
        }

        if (has("Jump Engine")) {
            ship_Name += "jump ";
        }

        if (u.speed > 620) {
            ship_Name += "speed-demon ";
        }

        /** 
         * @types unarmed
         */
        if (u.weapons.length === 0) {
            /** 
             * @class nuke
             * @spec must have a warhead && no weapons 
             * @baced type of warheads | amount of warheads
             */
            if (u.warhead) {
                let eDrain, impact, aoe;
                ship_Name += "| ";
                if (has("EMP Warhead")) {
                    //eDrain = _parts["EMP Warhead"] / 1000;
                    ship_Name += "emp ";
                }
                if (has("Shaped Warhead")) {
                    impact = _parts["Shaped Warhead"] * 50;
                    if (inRange(impact, 100, 400)) {
                        ship_Name += "intercepter ";
                    } else {
                        ship_Name += "impact ";
                    }
                }
                if (has("Explosive Warhead")) {
                    //aoe = _parts["Explosive Warhead"] * 16;
                    ship_Name += "aoe ";
                }
                return ship_Name + "nuke |";
            }

            /** 
             * @class shield
             * @spec no cloak or eTransfer && shield && no weapons 
             */
            if (has(["!Cloak Generator", "!Energy Transfer"])) {
                if (u.maxShield > 105) {
                    return ship_Name += "shield";
                }
            }

            /** 
             * @class capper / target
             */
            if (has(["!Stasis Field", "!Energy Transfer"])) {
                if (u.speed > 200) {
                    return ship_Name += "capper";
                }
                else {
                    return ship_Name += "target";
                }
            }
            /** 
             * @class mini-interceptor
             */
            if (has(["Stasis Field", "!Energy Transfer"])) {
                if (u.speed > 200 && u.cost < 300) {
                    return ship_Name += "mini-interceptor";
                }
            }
        }

        if (u.warhead) {
            ship_Name += "warhead ";
        }

        weapon_Names = [];

        u.weapons.forEach(weapon => {
            let name = "";
            switch (weapon.name) {
                case "Gravity Pull Wave":
                    name += "pull";
                    break;
                case "Gravity Push Wave":
                    name += "push";
                    break;
                case "EMP Gun":
                    name += "emp";
                    break;
                case "Artillery Gun":
                    name += "arty";
                    break;
                case "Torpedo Launcher":
                    name += "torp";
                    break;
                case "Sidewinder Missile":
                    name += "sw";
                    break;
                case "Tesla Turret":
                    name += "tesla";
                    break;
                case "Flamethrower":
                    name += "flame";
                    break;
                case "Fusion Ring":
                    name += "ring";
                    break;
                case "Plasma Turret":
                    name += "plasma";
                    break;
                case "Phase Bomb Launcher":
                    name += "phase";
                    break;
                case "Orb Launcher":
                    name += "orb";
                    break;
                case "Heavy Point Defence Turret":
                    name += "hpd";
                    break;
                case "Heavy Flak":
                    name += "flak";
                    break;
                default:
                    weapon.name.split(" ").forEach(string => {
                        name += string.charAt(0).toLowerCase();
                    });
                    break;
            };
            weapon_Names.push(name);
        });

        count = function (array) {
            array.sort();
            var string, current, count;
            string = [];
            current = null;
            count = 0;
            for (var i = 0; i <= array.length; i++) {
                if (array[i] != current) {
                    if (count > 8) {
                        string.push(current + " gunBed");
                    } else if (count > 4) {
                        string.push(count + "x" + current);
                    } else if (count === 4) {
                        string.push("quad " + current);
                    } else if (count === 3) {
                        string.push("tri " + current);
                    } else if (count === 2) {
                        string.push("duel " + current);
                    } else if (count > 0) {
                        string.push(current);
                    }
                    current = array[i];
                    count = 1;
                } else {
                    count++;
                }
            }
            return string;
        };

        wepons_Sorted = count(weapon_Names).join("/");

        for (let i = 0; i < weapon_Names.length; i++) {
            let name = weapon_Names[i];
            if (name === "pd" || name === "hpd") {
                delete weapon_Names[i]
            }
        }

        wepons_Sorted_NOPD = count(weapon_Names).join("/");

        /** 
         * @class lancer
         * @spec no cloak, stasis or eTransfer
         * @baced fast | mid range | light
         */
        if (has(["!Cloak Generator", "!Stasis Field", "!Energy Transfer"])) {
            if (u.speed > 320 && inRange(u.weaponRange, 1000, 2000) && u.cost < 300 && u.mass < 100) {
                if (u.weapons.length === 1 && has("Demispinal Turret Mount")) {
                    return ship_Name += `Demi ${wepons_Sorted} lancer`;
                }
                return ship_Name += wepons_Sorted + " lancer";
            }
        }

        /** 
         * @types fighter
         */
        if (has(["!Cloak Generator", "!Stasis Field", "!Energy Transfer"])) {
            if (has(["Scout Thruster || Fighter Thruster || Compact Cruiser Thruster || Cruiser Thruster || Bulk Thruster", "!360 Turret Mount", "!Spinal Turret Mount"]) && u.hp < 250) {
                let type;

                type = "";

                /** 
                 * @Type Preme
                 * @spec speed is more then 406
                 */
                if (u.speed > 406) {
                    type = "preme";
                }

                /** 
                 * @Type minimal fighter
                 * @old !has("Wing", "Volumetric Armor", "Heavyweight Armor", "Ultralight Armor", "1x1 Solar Panel || 2x2 Solar Panel || 3x3 Solar Panel") && _parts["Battery"] === 1 && !(_parts["Scout Thruster"] > 1 || _parts["Fighter Thruster"] > 1 || _parts["Compact Cruiser Thruster"] > 1)
                 */
                else if (Object.size(_parts) === 4 && has("Scout Thruster")) {
                    if (wepons_Sorted === "lb") wepons_Sorted = "";
                    return wepons_Sorted + " minimal fighter";
                }

                /** 
                 * @Type h-fighter
                 */
                else if (inRange(u.mass, 70, 150)) {
                    type = "h-fighter";
                }

                /** 
                 * @Type Fighter
                 */
                else {
                    type = "fighter";
                }

                if (u.weapons.length === 1) {
                    if (wepons_Sorted === "lb") wepons_Sorted = "";

                    /** 
                     * @Type 30* fighter
                     */
                    if (has("30 Turret Mount")) {

                        return wepons_Sorted + " 30* " + type;
                    }

                    /** 
                     * @Type 90* fighter
                     */
                    else if (has("90 Turret Mount")) {
                        return wepons_Sorted + " 90* " + type;
                    }

                    /** 
                     * @Type Demi fighter
                     */
                    else if (has("Demispinal Turret Mount")) {
                        return wepons_Sorted + " demi " + type;
                    }
                }

                return wepons_Sorted + " " + type;
            }
        }

        /** 
         * @class sub
         * @spec cloak no stasis or eTransfer
         * @baced mid range | can cloak before set time and will not uncloak in that time
         */
        if (has(["Cloak Generator", "!Stasis Field", "!Energy Transfer"])) {
            if (u.weaponRange > 900 && u.speed < 220 && u.cloakTime < (((u.weaponRange + (u.radius / 2)) / 320) && u.reloadTime)) {
                if (u.weapons.length === 1) {
                    if (has("Demispinal Turret Mount")) {
                        return ship_Name += `Demi ${wepons_Sorted} sub`;
                    }
                    if (has("Spinal Turret Mount")) {
                        return ship_Name += `Spinal ${wepons_Sorted} sub`;
                    }
                }
                return ship_Name += wepons_Sorted + " sub";
            }
        }

        /** 
         * @class mine
         * @spec cloak no stasis or eTransfer
         * @baced mid to low speed
         */
        if (has(["Cloak Generator", "!Stasis Field", "!Energy Transfer"])) {
            if (u.speed < 220) {
                if (u.weapons.length === 1) {
                    if (has("Demispinal Turret Mount")) {
                        return ship_Name += `Demi ${wepons_Sorted} mine`;
                    }
                    if (has("Spinal Turret Mount")) {
                        return ship_Name += `Spinal ${wepons_Sorted} mine`;
                    }
                }
                return ship_Name += wepons_Sorted + " mine";
            }
        }

        /** 
         * @class yoink-bomb
         * @spec can have cloak or stasis but no eTransfer
         * @baced high burst dammage | some hp | some speed | pull & phase 
         */
        if (has("!Energy Transfer")) {
            if (u.burst > 700 && u.speed > 200 && u.maxHP > 300 && has(["Phase Bomb Launcher", "Gravity Pull Wave"])) {
                return ship_Name += "yoink-bomb";
            }
        }

        /** 
         * @types bomber
         * @spec cloak && no eTransfer
         * @baced mid burst dammage | fast speed speed | ring || phase
         */
        if (has("!Energy Transfer") && u.genEnergy < 240) {
            if (has(["Fusion Ring || Phase Bomb Launcher"]) && u.speed > 220 && u.burst > 340) {
                return ship_Name += wepons_Sorted + "-bomb"; // ring / phase
            }
        }

        /** 
         * @class kev-shield
         * @spec no cloak or eTransfer && shield && spinal or demispinal
         * @baced 
         */
        if (has(["!Cloak Generator", "!Energy Transfer", "Spinal Turret Mount || Demispinal Turret Mount"])) {
            if (u.genEnergy > 1000 && u.genShield > 20.6) {
                return ship_Name += wepons_Sorted_NOPD + " kev-shield";
            }
        }

        /** 
         * @types kite
         */
        if (has("!Cloak Generator") && u.weaponRange > 900 && u.weaponArc > 180 ) {
            let type;
            type = "";

            /** 
             * @Type h-kite
             * @spec masss is more then 1k | slower then 100
             */
            if (u.mass > 1000 && u.speed < 130) {
                type = "h-kite";
            }

            /** 
             * @Type shield-kite
             * @spec has over 105 shield
             */
            else if (u.maxShield > 105) {
                type = "shield-kite";
            }
            /** 
             * @Type platform
             * @spec low hp
             */
            else if (u.weaponRange > 2000 && u.hp < 400 && u.hp < 400) {
                type = "platform";
            }
            /** 
             * @Type kite
             */
            else {
                type = "kite";
            }

            return wepons_Sorted + " " + type;
        }

        return ship_Name //+ wepons_Sorted;
    };

    shipsClass = () => {
        string = "";
        string += classifyShip();
        if (string.charAt(0) === " ") string = string.slice(1);
        designMode.unit.name = string.slice(0, 50);
        return designMode.save();
    };

    setFleetClasses = () => {
        let tracker = buildBar.selected;
        console.time("setFleetClasses");
        onecup.refresh();

        div(function () {
            position("relative");
            width(300);
            margin("0px auto");
            top(75);
            text_align("center");
            background_color("rgba(255,0,0,.5)");
            color("#EEE");
            padding(10);
            return raw("classify fleet");
        });

        for (let i = 0; i < 10; i++) {
            designMode.select(i);
            shipsClass();
        }

        console.timeEnd("setFleetClasses");
        onecup.refresh();
        return designMode.select(tracker);
    };

    window_onkeydown_orig = window.onkeydown;

    window.DEFAULT_SETTINGS.Classifier = {
        keys: [{
            which: 191
        }, null]
    };

    window.onkeydown = e => {
        let ret = window_onkeydown_orig.call(this, e);
        if (e.target.type === "text" || e.target.type === "password" || e.target.nodeName === "TEXTAREA") return;
        else if (settings.key(e, "Classifier") && ui.mode === "design") {
            return setFleetClasses()
        }
        return ret;
    };
}).call(this);
