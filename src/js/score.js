/* clefairy-says
 *
 * src/js/score.js - Score class
 *
 * coded by Stéphanie Cloutier
 */

 class CSScore {
     constructor(score) {
         this.numbers = [new CSNumber(Math.floor(score / 10), 0), new CSNumber(score % 10, 18)];
     }

     draw(game) {
         for(let i = 0; i < this.numbers.length; i++) {
             game.drawSpriteFromFrames(this.numbers[i]);
         }
     }
}
