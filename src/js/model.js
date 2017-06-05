/* clefairy-says
 *
 * src/js/moves.js - Moves class - display memorization phase
 *
 * coded by Stéphanie Cloutier
 */

class CSModel {
    constructor(width, height) {
        this.frames = {
            "normal": {
                    "sx": 6,
                    "sy": 0,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 116) / 2,
                    "dy": 226,
                    "dw": 128,
                    "dh": 124,
            },
            "up": {
                    "sx": 6,
                    "sy": 254,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 116) / 2,
                    "dy": 226,
                    "dw": 128,
                    "dh": 124,
            },
            "right": {
                    "sx": 0,
                    "sy": 508,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 226,
                    "dw": 128,
                    "dh": 124,
            },
            "down": {
                    "sx": 0,
                    "sy": 128,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 226,
                    "dw": 128 ,
                    "dh": 124 ,
            },
            "left": {
                    "sx": 0,
                    "sy": 380,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 226,
                    "dw": 128,
                    "dh": 124,
            },
        }
    }
}
// Display phase
    // Display "Memorize !" on the board for 3 sec. (see boardmessages)

    // Move accordingly to aMoves + show arrows on board (w/ music)

    // Display "Your turn !" on the board

    // Incremente IA's turn count++
