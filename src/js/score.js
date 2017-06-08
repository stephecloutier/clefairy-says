/* clefairy-says
 *
 * src/js/score.js - Score class
 *
 * coded by Stéphanie Cloutier
 */

 class CSScore {
     constructor(score) {
         this.numbers = [new CSNumber(score / 1000, 0), new CSNumber(score / 100, 1), new CSNumber(Math.floor(score / 10), 2), new CSNumber(score % 10, 3)];
     }

     draw(game) {
         for(let i = 0; i < this.numbers.length; i++) {
             game.drawSpriteFromFrames(this.numbers[i]);
         }
     }

     increment() {
         let changeUnit = false;
         let i = 1;
         do {
             changeUnit = this.numbers[this.numbers.length - i].increment();
             i++;
         } while(changeUnit);
     }
}
