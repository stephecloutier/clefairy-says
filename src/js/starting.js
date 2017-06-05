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
        this.emote = {
            "sx": 484,
            "sy": 666,
            "sw": 30,
            "sh": 34,
            "dx": (width - 30) / 2,
            "dy": 186,
            "dw": 30,
            "dh": 34,
        };
        this.clefairy = {
            "steps": [
                {
                    "sx": 0,
                    "sy": 0,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
                {
                    "sx": 0,
                    "sy": 124,
                    "sw": 142,
                    "sh": 124,
                    "dx": (width - 138) / 2,
                    "dy": 226,
                    "dw": 142,
                    "dh": 124,
                },
            ],
            "currentStep": 0,
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

    }

    animate(game) {
        // Drawing still frames
        game.drawSpriteFromFrames(this.title);
        game.drawSpriteFromFrames(this.button);

        this.time.current = Date.now();

        // Clefairy and emote animation
        if(this.time.current - this.time.start > 300) {
            this.clefairy.currentStep++;
            if(this.clefairy.currentStep === this.clefairy.steps.length) {
                this.clefairy.currentStep = 0;
                this.emote.dy += 4;
            } else {
                this.emote.dy -= 4;
            }
            this.time.start = Date.now();
        }
        game.drawSpriteFromFrames(this.clefairy.steps[this.clefairy.currentStep]);
        game.drawSpriteFromFrames(this.emote);
    }
}
