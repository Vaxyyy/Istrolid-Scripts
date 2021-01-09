(function () {
    var autoX;

    autoX = window.automatiX  = {};

    autoX.enabled = false;

    autoX.intv = null;

    autoX.time = 125;

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
}).call(this);
