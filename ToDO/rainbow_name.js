let rainbow = [[255, 0, 0, 255], [255, 165, 0, 255], [255, 255, 0, 255], [0, 128, 0, 255], [0, 0, 255, 255], [75, 0, 130, 255], [238, 130, 238, 255]];
let timer = 0;

let rainbow_name = function() {
    let line = chat.lines
    if (line === undefined) return;

    for (let i of chat.lines) {
        if (i.name !== "Server" && i.name !== commander.nameLower.slice(0, 3)) {
            if (i.text.toLowerCase().includes(commander.nameLower.slice(0, 3))) {
                i.color = rainbow[timer];
            }
        }
    }
    timer ++
    if (timer == rainbow.length) {
        timer = 0
    }
}

setInterval(() => {
    rainbow_name()
}, 1000);
