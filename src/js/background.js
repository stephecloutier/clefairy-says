/* clefairy-says
 *
 * src/js/background.js - Background class
 *
 * coded by Stéphanie Cloutier
 */

class CSBackground {
    constructor(width, height) {
        this.frame = {
            "sx": 290,
            "sy": 0,
            "sw": 460,
            "sh": 540,
            "dx": 0,
            "dy": 0,
            "dw": width,
            "dh": height,
        };
    }

    draw(game) {
        game.drawSpriteFromFrames(this.frame);
    }
}
