/* clefairy-says
 *
 * src/js/emote.js - Emote class - draws emotes
 *
 * coded by Stéphanie Cloutier
 */

 class CSEmotes {
     constructor(width, height, dy) {
         this.emotes = {
             "happy": {
                 "sx": 484,
                 "sy": 666,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             },
             "sad": {
                 "sx": 484,
                 "sy": 700,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             },
             "upset": {
                 "sx": 552,
                 "sy": 666,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             },
             "careful": {
                 "sx": 316,
                 "sy": 666,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             },
             "music": {
                 "sx": 384,
                 "sy": 632,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             },
             "heart": {
                 "sx": 416,
                 "sy": 666,
                 "sw": 30,
                 "sh": 33,
                 "dx": (width - 30) / 2,
                 "dy": dy,
                 "dw": 30,
                 "dh": 33,
             }
         };
     }

     draw(game, emote) {
         game.drawSpriteFromFrames(this.emotes[emote]);
     }
 }
