ui.playerChip = function (player, cut, defaultColor) {
    eval(onecup['import']());
    var chatPlayer;
    if (cut == null) {
        cut = 20;
    }
    if (defaultColor == null) {
        defaultColor = "white";
    }
    if (player.ai) {
        chatPlayer = {
            rank: 0
        };
    } else {
        chatPlayer = chat.players[player.name] || {
            rank: 0
        };
    }
    return div(".playerChip", function () {
        var x;
        position("relative");
        display("inline-block");
        height(24);
        line_height(24);
        oncontextmenu(function (e) {
            e.preventDefault();
            return ui.rmenu = {
                id: rid(),
                pos: [e.clientX, e.clientY],
                html: function () {
                    div(function () {
                        padding(5);
                        text(player.name);
                        if (chatPlayer.faction) {
                            return span(function () {
                                color("rgba(255,255,255,.3)");
                                text(` [${chatPlayer.faction}]`);
                            });
                        }
                    });
                    if (player.name !== commander.name && player.name !== "Server") {
                        div(".hover-red", function () {
                            padding(5);
                            if (!commander.mutes[player.name]) {
                                text("Mute player");
                            } else {
                                text("Unmute player");
                            }
                            return onclick(function () {
                                commander.mutes[player.name] = !commander.mutes[player.name];
                                account.rootSave();
                                return ui.rmenu = null;
                            });
                        });
                        return div(".hover-red", function () {
                            padding(5);
                            if (!commander.friends[player.name]) {
                                text("Add to friends");
                            } else {
                                text("Remove from friends");
                            }
                            return onclick(function () {
                                commander.friends[player.name] = !commander.friends[player.name];
                                account.rootSave();
                                return ui.rmenu = null;
                            });
                        });
                    }
                }
            };
        });
        x = 0;
        div(function () {
            var c, rank;
            left(x);
            position("absolute");
            box_shadow("inset 0 0 3px 2px rgba(255,255,255,.2)");
            border_radius(5);
            height(20);
            width(20);
            margin(2);
            if (player.connected === void 0 || player.connected === true) {
                c = player.color;
                if (c) {
                    background_color("rgba(" + c[0] + "," + c[1] + "," + c[2] + ",1)");
                }
            }
            if (player.ai && !sim.galaxyStar) {
                img({
                    src: "img/ui/player/ai.png",
                    width: 20,
                    height: 20
                });
            } else {
                rank = chatPlayer.rank;
                if (rank !== 0 && !isNaN(rank)) {
                    img({
                        src: rankImage(rank),
                        width: 20,
                        height: 20
                    });
                }
            }
            return x += 24;
        });
        if (player.host && !sim.galaxyStar) {
            x += 2;
            img({
                src: "img/ui/player/host.png",
                width: 20,
                heigth: 20
            }, function () {
                left(x);
                top(2);
                position("absolute");
                return x += 22;
            });
        }
        if (commander.mutes[player.name]) {
            img({
                src: "img/ui/player/mute.png",
                width: 20,
                heigth: 20
            }, function () {
                left(x);
                top(2);
                position("absolute");
                return x += 18;
            });
        }
        if (commander.friends[player.name]) {
            img({
                src: "img/ui/player/friend.png",
                width: 20,
                heigth: 20
            }, function () {
                left(x);
                top(2);
                position("absolute");
                return x += 18;
            });
        }
        x += 2;
        return span(function () {
            padding_left(x);
            if (player.afk) {
                color("rgba(255,255,255,.6)");
            }
            if (!player.name) {
                return text(" ???");
            } else {
                return text(player.name);
            }
        });
    });
};
