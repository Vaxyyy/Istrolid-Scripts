function drawReconnectButton() {
    eval(onecup['import']());

    css('.recImg', function () {
        position('absolute');
        left(10);
        top(0);
    });
    css('.recText', function () {
        position('absolute');
        line_height(12);
        font_size(12);
        text_align('center');
        width(64);
        top(44);
        color('white');
    });

    div('.hover-black', () => {
        position('absolute');
        text_align('right');
        right(128);
        top(0);
        z_index('10');
        height(64);
        width(64);
        img({
            src: "img/ui/reload.png",
            width: 44,
            height: 44,
            class: 'recImg'
        });
        div('.recText', () => {
            text('reconnect');
        });
        onclick(e => reconnect());
    });
}

function reconnect() {
    if (network.websocket !== undefined) network.websocket.close();
    return battleMode.joinServer(battleMode.serverName);
}

let window_body_orig = window.body;

window.body = function () {
    if (ui.mode === 'battle' || ui.mode === 'multiplayer' || ui.mode === 'design' || ui.mode === 'battleroom' || ui.mode === 'quickscore') {
        drawReconnectButton();
    }
    return window_body_orig.call(this);
};
