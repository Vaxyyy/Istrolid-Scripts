(function () {
    var autoX, resetTime;

    autoX = window.automatiX  = {};

    autoX.enabled = false

    autoX.intv = null;

    autoX.time = 125;

    resetTime = function (newTime) {
        autoX.time = newTime
        clearInterval(autoX.intv);
        return autoX.intv = setInterval(() => {
            if (autoX.enabled) {
                for (let i in intp.things) {
                    unit = intp.things[i];
                    if (unit.name === 'Unit' && unit.side === commander.side) {
                        commander.selection.push(unit);
                    }
                }
                battleMode.stopOrder();
                commander.selection = [];
            }
        }, autoX.time);
    }
}).call(this);
