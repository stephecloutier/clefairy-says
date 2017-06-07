class CSArrow {
    constructor(direction, index) {
        this.direction = direction;
        this.directions = {
            "left": {
                "sx": 288,
                "sy": 632,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 54,
                "dw": 14,
                "dh": 14,
            },
            "up": {
                "sx": 288,
                "sy": 646,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 54,
                "dw": 14,
                "dh": 14,
            },
            "right": {
                "sx": 288,
                "sy": 678,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 54,
                "dw": 14,
                "dh": 14,
            },
            "down": {
                "sx": 288,
                "sy": 662,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 54,
                "dw": 14,
                "dh": 14,
            },
        };
        this.directions[this.direction].dx += 37 * (index % 10);
        this.directions[this.direction].dy += 40 * Math.floor(index/10);
    }

    draw(game) {
        game.drawSpriteFromFrames(this.directions[this.direction]);
    }
}
