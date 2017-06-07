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
                    "dy": 400,
                    "dw": 142,
                    "dh": 124,
                },
                "up": {
                    "sx": 142,
                    "sy": 248,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 400,
                    "dw": 142,
                    "dh": 124,
                },
                "right": {
                    "sx": 142,
                    "sy": 496,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 400,
                    "dw": 142,
                    "dh": 124,
                },
                "down": {
                    "sx": 142,
                    "sy": 124,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 400,
                    "dw": 142,
                    "dh": 124,
                },
                "left": {
                    "sx": 142,
                    "sy": 372,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 400,
                    "dw": 142,
                    "dh": 124,
                },
            },
        };

        this.time = {
            "start": Date.now(),
            "current": null,
        };

    }

    draw(game, version, move) {
        game.drawSpriteFromFrames(this.sprites[version][move]);
    }

    handleAction(oEvent, game) {
        if(oEvent.keyCode === 37 || oEvent.keyCode === 38 || oEvent.keyCode === 39 || oEvent.keyCode === 40 ) {
            for(let i = 0; i < game.aPossibleMoves.length; i++) {
                if(game.aPossibleMoves[i].key === oEvent.keyCode) {
                    game.aPlayerMoves.push(game.aPossibleMoves[i].position)
                    console.log(game.aPlayerMoves);
                }
            }
        }
    }
}
