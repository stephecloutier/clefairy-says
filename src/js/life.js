/* clefairy-says
 *
 * src/js/life.js - Lifes class
 *
 * coded by Stéphanie Cloutier
 */

class CSLife {
    constructor(status, index) {
        this.status = status;
        this.index = index;
        this.display = false;
        this.sprites = {
            "alive": {
                "sx": 619,
                "sy": 701,
                "sw": 36,
                "sh": 59,
                "dx": 124,
                "dy": 87,
                "dw": 36,
                "dh": 59,
            },
            "dead": {
                "sx": 655,
                "sy": 701,
                "sw": 36,
                "sh": 59,
                "dx": 124,
                "dy": 87,
                "dw": 36,
                "dh": 59,

                /*
                "ballOpen": {
                    "sx": 655,
                    "sy": 701,
                    "sw": 36,
                    "sh": 59,
                    "dx": 124,
                    "dy": 87,
                    "dw": 36,
                    "dh": 59,
                },
                "ballStartClosed": {
                    "sx": 691,
                    "sy": 701,
                    "sw": 36,
                    "sh": 59,
                    "dx": 124,
                    "dy": 87,
                    "dw": 36,
                    "dh": 59,
                },
                "ballClosed": {
                    "sx": 727,
                    "sy": 701,
                    "sw": 36,
                    "sh": 59,
                    "dx": 124,
                    "dy": 87,
                    "dw": 36,
                    "dh": 59,
                },
                */
            }
        };
        this.sprites[status].dx += this.index * 44;
    }

    draw(game) {
        if(this.status === "dead") {
            game.drawSpriteFromFrames(this.sprites["dead"]);
        }
        game.drawSpriteFromFrames(this.sprites["alive"]);


    }
}
