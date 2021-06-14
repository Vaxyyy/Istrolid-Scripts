//miniMap
// open mini map "M"
(function () {
    eval(onecup["import"]());

    environment = {
        mapColor_RGB: "rgba(0,0,0,255)",
        miniMap_type: "cost",
        miniMap_enabled: true,
        valueTracker_enabled: false
    };
    sim.map_east = 0;
    sim.map_west = 0;
    sim.map_north = 0;
    sim.map_south = 0;

    miniButton = function (name, binding, fn) {
        return div(".hover-black", function () {
            position("absolute");
            height(42);
            width(42);
            padding(5);
            img({
                src: "img/ui/" + name + ".png",
                width: 32,
                height: 32
            });
            onmouseover(function (e) {
                battleMode.tipBounds = e.target.getBoundingClientRect();
                return battleMode.tip = function () {
                    text_align("center");
                    text(binding);
                    text(" ");
                    return span(function () {
                        color("#f39c12");
                        return text(settings.humanViewBinding(binding));
                    });
                };
            });
            return fn();
        });
    };

    secondsToString = function(seconds) {
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        if (JSON.stringify(numminutes).length == 1) numminutes = "0" + numminutes;
        if (JSON.stringify(numseconds).length == 1) numseconds = "0" + numseconds;
        return numminutes + ":" + numseconds;
    }

    draw_miniMap = function () {
        let north = 0, south = 0, east = 0, west = 0;
        div(function () {
            position("absolute");

            if (sim.map_north > sim.map_east) {
                bottom(124 + (window.innerHeight / 2) * `0.${Math.round(sim.map_north)}`);
            } else {
                bottom(124 + (window.innerHeight / 2) * `0.${Math.round(sim.map_east)}`);
            }
            
            left(0);

            width(96);
            height(32);

            background("rgba(0,0,0,.2)");
            border_radius("0px 10px 0px 0px");

            text_align("center");
            font_size(30);
            color("white");
            if (sim.state == "running") text(secondsToString(Math.round(sim.step / 16)));
            else text("00:00");
        });
        return div(function () {
            position("absolute");

            left(0);
            bottom(126);

            z_index('2');

            if (sim.map_north > sim.map_east) {
                width((window.innerWidth / 2) * `0.${Math.round(sim.map_north)}`);
                height((window.innerHeight / 2) * `0.${Math.round(sim.map_north)}`);
            } else if (sim.map_east > sim.map_north) {
                width((window.innerWidth / 2) * `0.${Math.round(sim.map_east)}`);
                height((window.innerHeight / 2) * `0.${Math.round(sim.map_east)}`);
            } else {
                width((window.innerWidth / 2) * `0.${Math.round(sim.map_east)}`);
                height((window.innerHeight / 2) * `0.${Math.round(sim.map_north)}`);
            }
            border("4px solid black");
            border_color("rgba(0,0,0,.2)");
            border_radius("0px 10px 0px 0px");

            background_color("rgba(0,0,0,.1)");

            return div(function () {

                

                position("absolute");

                width(0);
                height(0);
                left("50%");
                top("50%");
                transform("translate(-50%, -50%)");

                for (let i in sim.things) {
                    thing = sim.things[i];


                    if (thing.pos[0] > east) east = thing.pos[0];
                    if (thing.pos[0] < west) west = thing.pos[0];

                    if (thing.pos[1] > north) north = thing.pos[1];
                    if (thing.pos[1] < south) south = thing.pos[1];

                    if (thing.spawn) {
                        if (thing.side == "alpha") {
                            blip(thing.pos, 32, "spawn", "white");
                        } else if (thing.side == "beta") {
                            blip(thing.pos, 32, "spawn", "black");
                        }
                    } else if (thing.name === "CommandPoint" || thing.capping == 0) {
                        if (thing.side == "alpha") blip(thing.pos, 16, "commandPoint", "rgba(255,255,255,.2)");
                        else if (thing.side == "beta") blip(thing.pos, 16, "commandPoint", "rgba(0,0,0,.2)");
                    } else if (thing.active) {
                        if (environment.miniMap_type == "radius") {
                            blip(thing.pos, 10 * ((thing.radius * 2) / 300), "ship", `rgba(${thing.color[0]},${thing.color[1]},${thing.color[2]},255)`)
                        } else if (environment.miniMap_type == "cost") {
                            blip(thing.pos, 10 * ((thing.cost * 2) / 2000), "ship", `rgba(${thing.color[0]},${thing.color[1]},${thing.color[2]},255)`)
                        }
                    };
                }

                sim.map_east = east;
                sim.map_west = west;
                sim.map_north = north;
                sim.map_south = south;
            });
        });
    };

    blip = function (pos, size, type, teamColor) {
        return div(function () {
            position("absolute");
            left(pos[0] / 40);
            bottom(pos[1] / 40);
            z_index("3");
            return div(function () {
                position("absolute");
                width(size);
                height(size);

                left("50%");
                top("50%");
                transform("translate(-50%, -50%)");
                if (type == "spawn") {
                    border("2px dashed " + teamColor);
                } else if (type == "player mouse") {
                    border("2px dashed black");
                    background_color(teamColor)
                } else {
                    background_color(teamColor)
                }
                border_radius(`${size}px ${size}px ${size}px ${size}px`);
            });
        });
    };

    draw_valueTracker = function () {
        return div(function () {
            position("absolute");

            top(64);
            left("50%");
            transform("translate(-50%, 0)");

            width(384);
            height(224);

            background("rgba(0,0,0,.2)");
            border_radius("0px 0px 10px 10px");
        });
    };

    try {
        window_body_orig = window.body;
        window_onkeydown_orig = window.onkeydown;
    } catch (e) {}

    window.body = e => {
        if (ui.mode === "battle") {
            if (environment.miniMap_enabled) draw_miniMap();
            //if (environment.valueTracker_enabled) draw_valueTracker();

            miniButton("aoe", "Mini Map", function () {
                z_index("2");
                bottom(84);
                left((window.innerWidth / 2) - 266);
                if (environment.miniMap_enabled) {
                    background("rgba(255,255,255,.3)");
                }
                return onclick(function () {
                    return environment.miniMap_enabled = !environment.miniMap_enabled;
                });
            });
        }
        return window_body_orig.call(this, e);
    };

    window.DEFAULT_SETTINGS["Mini Map"] = {
        keys: [{
            which: 77
        }, null]
    }

    window.onkeydown = e => {
        if (e.target.type === "text" || e.target.type === "password" || e.target.nodeName === "TEXTAREA") return;
        else if (settings.key(e, "Mini Map") && ui.mode === "battle") {
            environment.miniMap_enabled = !environment.miniMap_enabled;
        }
        return window_onkeydown_orig.call(this, e);
    };

    setInterval(() => {
        if (ui.mode === "battle") onecup.refresh();
        //if (sim.theme !== undefined) mapColor_RGB = JSON.stringify(sim.theme.spotColor).replace(`[`, `rgb(`).slice(0, -5).concat(`)`);; 
    }, (sim.ticksPerSec + 1) * 1);

}).call(this);
