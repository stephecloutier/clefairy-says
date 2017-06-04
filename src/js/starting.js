/* clefairy-says
 *
 * src/js/starting.js - Starting screen
 *
 * coded by Stéphanie Cloutier
 */

 class CSStarting {
     constructor(width, height) {
         this.frames = {
             "title": {
                 "sx": 558,
                 "sy": 632,
                 "sw": 146,
                 "sh": 60,
                 "dx": (width - 146) / 2,
                 "dy": 84,
                 "dw": 146,
                 "dh": 60,
             },
             "emote": {
                 "sx": 458,
                 "sy": 666,
                 "sw": 30,
                 "sh": 34,
                 "dx": (width - 30) / 2,
                 "dy": 186,
                 "dw": 30,
                 "dh": 34,
             },
             "clefairy": {
                 "sx": 6,
                 "sy": 0,
                 "sw": 116,
                 "sh": 120,
                 "dx": (width - 116) / 2,
                 "dy": 226,
                 "dw": 116 ,
                 "dh": 120 ,
             },
             "button": {
                 "sx": 290,
                 "sy": 540,
                 "sw": 220,
                 "sh": 92,
                 "dx": (width - 220) / 2,
                 "dy": 380,
                 "dw": 220,
                 "dh": 92,
             },

         }
     }

     draw(game){
         game.drawSpriteFromFrames(this.frames.title);
         game.drawSpriteFromFrames(this.frames.emote);
         game.drawSpriteFromFrames(this.frames.clefairy);
         game.drawSpriteFromFrames(this.frames.button);
     }

 }
