/* clefairy-says
 *
 * src/js/starting.js - Starting screen
 *
 * coded by Stéphanie Cloutier
 */

class CSStarting {
    constructor(width, height) {
        this.title = {
             "sx": 584,
             "sy": 632,
             "sw": 146,
             "sh": 60,
             "dx": (width - 146) / 2,
             "dy": 84,
             "dw": 146,
             "dh": 60,
        };

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
        this.position = "normal";
        this.currentStep = 0;

    }

    draw(game) {
        // Drawing still frames
        game.drawSpriteFromFrames(this.title);
        game.drawSpriteFromFrames(this.button);

        this.time.current = Date.now();

        // Clefairy and emote animation
        if(this.time.current - this.time.start > 300) {
            if(this.currentStep) {
                this.position = "down";
                game.modelEmotes.emotes.happy.dy -= 4;
                this.currentStep = 0;
            } else {
                this.position = "normal";
                game.modelEmotes.emotes.happy.dy += 4;
                this.currentStep++;
            }
            this.time.start = Date.now();
        }

        // Clefairy + emote draw
        game.clefairy.draw(game, "model", this.position);
        game.modelEmotes.draw(game, "happy");
    }
}
