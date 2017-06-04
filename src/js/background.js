/* clefairy-says
 *
 * src/js/background.js - Background class
 *
 * coded by Stéphanie Cloutier
 */

class CSBackground {
    constructor(width, height) {
        this.frame = {
            "sx": 145,
            "sy": 0,
            "sw": 460,
            "sh": 540,
            "dx": 0,
            "dy": 0,
            "dw": width*2,
            "dh": height*2,
        };
    }

    draw(game) {
        game.drawSpriteFromFrames(this.frame);
    }
}
