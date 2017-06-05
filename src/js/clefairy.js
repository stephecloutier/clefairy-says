/* clefairy-says
 *
 * src/js/moves.js - Moves class - display memorization phase
 *
 * coded by Stéphanie Cloutier
 */

class CSClefairy {
    constructor(width, height) {
        this.sprites = {
            "model": {
                "normal": {
                    "sx": 0,
                    "sy": 0,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "up": {
                    "sx": 0,
                    "sy": 248,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "right": {
                    "sx": 0,
                    "sy": 496,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "down": {
                    "sx": 0,
                    "sy": 124,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "left": {
                    "sx": 0,
                    "sy": 372,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
            },
            "ditto": {
                "normal": {
                    "sx": 142,
                    "sy": 0,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "up": {
                    "sx": 142,
                    "sy": 248,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "right": {
                    "sx": 142,
                    "sy": 496,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "down": {
                    "sx": 142,
                    "sy": 124,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                "left": {
                    "sx": 142,
                    "sy": 372,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
            },
        };
    }

    draw(game, sprite) {
        game.drawSpriteFromFrames(this.sprites[sprite].normal);
    }

    animate(game, sprite) {
        game.drawSpriteFromFrames(this.sprites[sprite].up);
    }
}
// Display phase
    // Display "Memorize !" on the board for 3 sec. (see boardmessages)

    // Move accordingly to aMoves + show arrows on board (w/ music)

    // Display "Your turn !" on the board

    // Incremente IA's turn count++
