/* clefairy-says
 *
 * src/js/board-messages.js - Board messages class
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
                 "dy": 100,
                 "dw": 146,
                 "dh": 26,
             },
             "playerTurn": {
                 "sx": 467,
                 "sy": 734,
                 "sw": 147,
                 "sh": 26,
                 "dx": (width - 147) / 2,
                 "dy": 100,
                 "dw": 146,
                 "dh": 26,
             },
         };
     }

     draw(game, name) {
         game.drawSpriteFromFrames(this.messages[name]);
     }
 }
