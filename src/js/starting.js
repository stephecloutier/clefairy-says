/* clefairy-says
 *
 * src/js/starting.js - Starting screen
 *
 * coded by Stéphanie Cloutier
 */

class CSStarting {
    constructor(width, height) {
        this.button = {
             "sx": 316,
             "sy": 540,
             "sw": 220,
             "sh": 92,
             "dx": (width - 220) / 2,
             "dy": 380,
             "dw": 220,
             "dh": 92,
        };

        this.time = {
            "start": Date.now(),
            "current": null,
        };

        // init clefairy position and step variable
        this.direction = "normal";
        this.currentStep = 0;

    }

    draw(game) {
        // Drawing still frames
        game.boardMessages.message = "gameTitle";
        game.drawSpriteFromFrames(this.button);
        game.modelEmotes.emote = "happy";
        game.modelEmotes.display = true;

        this.time.current = Date.now();

        // Clefairy and emote animation
        if(this.time.current - this.time.start > 300) {
            if(this.currentStep) {
                this.direction = "down";
                game.modelEmotes.emotes[game.modelEmotes.emote].dy -= 4;
                this.currentStep = 0;
            } else {
                this.direction = "normal";
                game.modelEmotes.emotes[game.modelEmotes.emote].dy += 4;
                this.currentStep++;
            }
            this.time.start = Date.now();
            //console.log(game.modelEmotes.dy);
        }

        // Clefairy + emote draw
        game.clefairy.direction = this.direction;
        game.modelEmotes.draw(game, "happy");
    }
}
