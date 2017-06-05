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
        }
    }
}
// Display phase
    // Display "Memorize !" on the board for 3 sec. (see boardmessages)

    // Move accordingly to aMoves + show arrows on board (w/ music)

    // Display "Your turn !" on the board

    // Incremente IA's turn count++
