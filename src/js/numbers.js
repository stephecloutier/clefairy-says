/* clefairy-says
 *
 * src/js/numbers.js - Numbers class
 *
 * coded by Stéphanie Cloutier
 */

 class CSNumber {
     constructor(number, index) {
         this.number = number;
         this.numbers = {
            "sx": 300,
            "sy": number * 32,
            "sw": 16,
            "sh": 26,
            "dx": 250 + (index * 18),
            "dy": 133,
            "dw": 16,
            "dh": 26,
         }
     }

     draw(game) {
         game.drawSpriteFromFrames(this.numbers);
     }

     increment() {
         this.number = (++this.number % 10);
         this.numbers.sy = this.number * 32;
         console.log(!this.number);
         return !this.number;
     }
 }
