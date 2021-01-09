(function () {
    var autoX, hoverTip, editorButtons;

    eval(onecup['import']());

    autoX = window.automaticX = {};

    autoX.draw = function () {
        return editorButtons();
    };

    autoX.enabled = false;

    autoX.intv = null;

    autoX.time = 500;

    autoX.resetTime = function (newTime) {
        autoX.time = newTime;
        intv = null;
        clearInterval(autoX.intv);
        clearInterval(intv);
        return autoX.intv = setInterval(() => {
            if (autoX.enabled && sim.state === 'running' && commander.side !== 'spectators' || localStorage.useAi) {
                commander.selection = [];
                for (let i in intp.things) {
                    unit = intp.things[i];
                    if (unit.name === 'Unit' && unit.side === commander.side) {
                        commander.selection.push(unit);
                    }
                }
                network.send("stopOrder");
                commander.selection = [];
            }
        }, autoX.time);
    };
    
    hoverTip = function(message) {
        return onmouseover(function(e) {
          designMode.smallTipBounds = e.target.getBoundingClientRect();
          return designMode.smallTip = message;
        });
      };

    editorButtons = function () {
        return div(function () {
            var editorButton;
            position("absolute");
            right(500);
            top(80);
            z_index('2');
            width(620);
            text_align("right");
            color("#DDD");
            padding(0);
            editorButton = function (name, fn) {
                return div(".hover-black", function () {
                    position("relative");
                    display("inline-block");
                    width(40);
                    height(40);
                    padding(10);
                    if (name) {
                        img({
                            src: "https://raw.githubusercontent.com/Vaxyyy/istrolidUI/main/" + name + ".png",
                            width: 20,
                            height: 20
                        }, function () {
                            position("absolute");
                            top(10);
                            return left(10);
                        });
                        hoverTip(name);
                    }
                    return fn();
                });
            };
            if (designMode.showAiTools) {
                if (localStorage.useAi === "true") {
                    editorButton("automaticX", function () {
                        if (autoX.enabled) {
                            background("rgba(255,0,0,.2)");
                        }
                        return onclick(function () {
                            return autoX.enabled = !autoX.enabled;
                        });
                    });
                }
            }
        });
    };

	window_body_orig = window.body;

	window.body = function () {
		if (ui.mode === 'design') {
			autoX.draw();
		}
		return window_body_orig.call(this);
	};
}).call(this);

automaticX.resetTime(automaticX.time);
