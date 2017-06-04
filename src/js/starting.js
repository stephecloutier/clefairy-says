/* clefairy-says
 *
 * src/js/starting.js - Starting screen
 *
 * coded by Stéphanie Cloutier
 */

class CSStarting {
    constructor(width, height) {
        this.title = {
             "sx": 558,
             "sy": 632,
             "sw": 146,
             "sh": 60,
             "dx": (width - 146) / 2,
             "dy": 84,
             "dw": 146,
             "dh": 60,
        };
        this.emote = {
             "sx": 458,
             "sy": 666,
             "sw": 30,
             "sh": 34,
             "dx": (width - 30) / 2,
             "dy": 186,
             "dw": 30,
             "dh": 34,
        };
        this.clefairy = [
            {
                  "sx": 6,
                  "sy": 0,
                  "sw": 128,
                  "sh": 124,
                  "dx": (width - 116) / 2,
                  "dy": 226,
                  "dw": 128,
                  "dh": 124,
            },
            {
                "sx": 0,
                "sy": 128,
                "sw": 128,
                "sh": 124,
                "dx": (width - 128) / 2,
                "dy": 226,
                "dw": 128 ,
                "dh": 124 ,
            },
        ];
        this.button = {
             "sx": 290,
             "sy": 540,
             "sw": 220,
             "sh": 92,
             "dx": (width - 220) / 2,
             "dy": 380,
             "dw": 220,
             "dh": 92,
        };
    }

     /*
     this.frames.clefairy.animation = {
         "max": this.frames.clefairy.length,
         "current": 0,
     }
     */

     //this.time

     //this.frames.clefairy.state = {}



    draw(game){
        game.drawSpriteFromFrames(this.title);
        game.drawSpriteFromFrames(this.emote);
        //game.drawSpriteFromFrames(this.clefairy);
        game.drawSpriteFromFrames(this.button);

    }

}
