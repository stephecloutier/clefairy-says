/* clefairy-says
 *
 * src/js/board-messages.js - Board messages classes
 *
 * coded by Stéphanie Cloutier
 */

 class CSBoardMessages {
     constructor(width, height) {
         this.messages = {
             "memorize": {
                 "sx": 316,
                 "sy": 734,
                 "sw": 146,
                 "sh": 26,
                 "dx": (width - 146) / 2,
                 "dy": 60,
                 "dw": 146,
                 "dh": 26,
             },
         };
     }

     draw(game, name) {
         game.drawSpriteFromFrames(this.messages[name]);
     }
 }
