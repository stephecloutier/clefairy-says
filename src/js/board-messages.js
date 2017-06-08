/* clefairy-says
 *
 * src/js/board-messages.js - Board messages class
 *
 * coded by Stéphanie Cloutier
 */

 class CSBoardMessage {
     constructor(width, message) {
         this.message = message;
         this.messages = {
             "gameTitle": {
                  "sx": 584,
                  "sy": 632,
                  "sw": 146,
                  "sh": 60,
                  "dx": (width - 146) / 2,
                  "dy": 84,
                  "dw": 146,
                  "dh": 60,
             },
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
             "gameOver": {
                 "sx": 741,
                 "sy": 632,
                 "sw": 172,
                 "sh": 26,
                 "dx": (width - 172) / 2,
                 "dy": 74,
                 "dw": 172,
                 "dh": 26,
             },
             "score": {
                 "sx": 763,
                 "sy": 692,
                 "sw": 100,
                 "sh": 26,
                 "dx": 137,
                 "dy": 132,
                 "dw": 100,
                 "dh": 26,
             }
         };
     }

     draw(game) {
         game.drawSpriteFromFrames(this.messages[this.message]);
     }
 }
