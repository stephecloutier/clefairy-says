/* clefairy-says
 *
 * src/js/clefairy.js - Clefairy says main class
 *
 * coded by Stéphanie Cloutier
 */

const SPRITESHEET_PATH = "resources/sprite_sheet2x.png";


class Clefairy {
    constructor({canvas, context, width, height}) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener("load", () => {
            this.setup();
        });
        this.sprites.src = SPRITESHEET_PATH;

        this.gameKeys = [32, 13, 38, 40, 37, 39, 65, 66];
    }

    setup() {
        this.reset();

        document.addEventListener("keyup", this.handleAction.bind(this));
        this.canvas.addEventListener("click", this.handleAction.bind(this));

        this.animate();
    }

    reset() {
        let {width, height} = this;

        this.background = new CSBackground(width, height);
        this.starting = new CSStarting(width, height);
        //this.arrows = new CSArrows(width, height);
        //this.ditto = new CSDitto(width, height);
        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // check game state
        /*
        if(this.started) {
            this.checkState();
        }
        */

        // update elements (TODO)
        //if(this.started) {}

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);

        if(this.started) {
            // do something
            if(this.ended) {
                // draw gameover
            }
        } else {
            this.starting.animate(this);
        }

    }

    handleAction(oEvent) {

        // Check if key pressed is in they gameKeys array
        const fValidateKey = function(iCurrentKeyCode) {
            if(oEvent.keyCode === iCurrentKeyCode) return oEvent.keyCode;
        }
        if((oEvent.type == "keyup") && typeof this.gameKeys.find(fValidateKey) === "undefined") {
            return;
        }

        // Check if game has started
        if(this.started) {
            checkState();
        } else {
            if(oEvent.keyCode === 13 || oEvent.keyCode === 32) {
                this.started = true;
                this.launchGame();
            }
        }

        /*
        if(this.ended) {
            if(hasValidate) {
                this.reset();
                this.animate();
            }
        }
        */
    }

    launchGame() {
        // Initialize movesArray;
        // giveMoves();
    }

    checkState() {
        // Check if its player's or IA's turn
            // IA
                // do something
            // Player
                //validateEntries();
    }

    giveMoves() {
        // Launches IA's phase
            // Display "Memorize !" on the board for 3 sec.

            // Store in new array random arrows
            // Move accordingly w/ music

            // Display "Your turn !" on the board

            // Incremente IA's turn count++
    }

    validateMoves() {

    }



    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
