class CSGoBack {
    constructor() {
        this.arrow = {
            "sx": 872,
            "sy": 693,
            "sw": 67,
            "sh": 58,
            "dx": 17,
            "dy": 469,
            "dw": 67,
            "dh": 58,
        }
    }
    draw(game) {
        game.drawSpriteFromFrames(this.arrow);
    }
}
