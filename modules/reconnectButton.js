(function () {
    var rcMod, topButton, window_body_orig;

    eval(onecup['import']());

    rcMod = window.reconnectMod = {};

    rcMod.valid_uiModes = ['battle', 'multiplayer', 'design', 'battleroom', 'quickscore'];

    topButton = function (mode, fn) {
        return div(".hover-black", function () {
            display("inline-block");
            height(64);
            width(64);
            position("relative");
            img({
                src: "https://raw.githubusercontent.com/Vaxyyy/istrolidUI/main/" + mode + ".png",
                width: 44,
                height: 44
            }, function () {
                top(0);
                left(10);
                return position("absolute");
            });
            div(function () {
                position("absolute");
                line_height(12);
                font_size(12);
                text_align("center");
                width(64);
                top(44);
                return text(mode);
            });
            if (fn != null) {
                return fn();
            } else {
                if (ui.mode === mode) {
                    background_color("rgba(255,255,255,.6)");
                    return onclick(function () {
                        return ui.go('battle');
                    });
                } else {
                    return onclick(function () {
                        return ui.go(mode);
                    });
                }
            }
        });
    };

    window_body_orig = window.body;

    window.body = function () {
        if (rcMod.valid_uiModes.includes(ui.mode)) {
            div(function () {
                position("absolute");
                right(128);
                top(0);
                z_index('2');
                color("white");
                return topButton("reconnect", fn = function() { 
                    onclick(function () {
                        if (network.websocket !== undefined) network.websocket.close();
                        return battleMode.joinServer(battleMode.serverName);
                    })
                });
            });
        }
        return window_body_orig.call(this);
    };
}).call(this);
