/* clefairy-says
 *
 * src/js/game-over.js - Game over class
 *
 * coded by Stéphanie Cloutier
 */


class CSGameOver {
    constructor(width) {
        this.frames = [
            {
                "sx": 536,
                "sy": 540,
                "sw": 220,
                "sh": 92,
                "dx": (width - 220) / 2,
                "dy": 240,
                "dw": 220,
                "dh": 92,
            },
            {
                "sx": 0,
                "sy": 620,
                "sw": 142,
                "sh": 124,
                "dx": (width - 142) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
            {
                "sx": 142,
                "sy": 620,
                "sw": 142,
                "sh": 124,
                "dx": (width - 142) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            }
        ]
    }

    draw(game) {

        game.drawSpriteFromFrames(this.frames[0]);
        game.clefairy.versions.clefairy.normal.dy += 10000;
        /* Tried to animate, but lacking time.
        game.time.current = Date.now();
        if(game.currentStep >= this.frames.length) {
            game.drawSpriteFromFrames(this.frames[2]);
        }

        if(game.time.current - game.time.gameOver > 1000) {
            if(game.currentStep === 1) {
                game.clefairy.versions.clefairy.normal.dy = -1000;
            }
            game.currentStep++;
        }
        */
    }
}
