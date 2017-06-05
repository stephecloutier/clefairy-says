/* clefairy-says
 *
 * src/js/board-messages.js - Display board messages according to phase
 *
 * coded by Stéphanie Cloutier
 */

 class CSMemorizeMessage {
     constructor(width, height) {
         this.memorize = {
             "sx": 316,
             "sy": 734,
             "sw": 146,
             "sh": 26,
             "dx": (width - 146) / 2,
             "dy": 60,
             "dw": 146,
             "dh": 26,
         };
     }

     draw(game) {
         game.drawSpriteFromFrames(this.memorize);
     }
 }
