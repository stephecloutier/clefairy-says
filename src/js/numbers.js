/* clefairy-says
 *
 * src/js/numbers.js - Numbers class
 *
 * coded by Stéphanie Cloutier
 */

 class CSNumber {
     constructor(number, dx) {
         this.number = number;
         this.numbers = {
            "sx": 300,
            "sy": number * 32,
            "sw": 16,
            "sh": 26,
            "dx": 270 + dx,
            "dy": 133,
            "dw": 16,
            "dh": 26,
         }
     }

     draw(game) {
         game.drawSpriteFromFrames(this.numbers[this.number]);
     }
 }
