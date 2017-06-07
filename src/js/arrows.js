class CSArrows {
    constructor(width, height) {
        this.sprites = {
            "left": {
                "sx": 288,
                "sy": 632,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 57,
                "dw": 14,
                "dh": 14,
            },
            "up": {
                "sx": 288,
                "sy": 646,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 57,
                "dw": 14,
                "dh": 14,
            },
            "right": {
                "sx": 288,
                "sy": 662,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 57,
                "dw": 14,
                "dh": 14,
            },
            "down": {
                "sx": 288,
                "sy": 678,
                "sw": 14,
                "sh": 14,
                "dx": 53,
                "dy": 57,
                "dw": 14,
                "dh": 14,
            },
        }
    }

    draw(game, direction) {
        game.drawSpriteFromFrames(this.sprites[direction]);
    }
}
