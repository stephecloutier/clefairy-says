/* clefairy-says
 *
 * src/js/clefairy.js - Clefairy says main class
 *
 * coded by Stéphanie Cloutier
 */

const SPRITESHEET_PATH = "resources/sprite_sheet2x.png";


class ClefairySays {
    constructor({canvas, context, width, height}) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // init variables
        this.aGameKeys = [32, 13, 38, 40, 37, 39, 65, 66];
        this.aPossibleMoves = [
            {"key": 37, "position": "left"},
            {"key": 38, "position": "up"},
            {"key": 39, "position": "right"},
            {"key": 40, "position": "left"},
        ];
        this.aMoves = [];
        this.sState = '';

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener("load", () => {
            this.setup();
        });
        this.sprites.src = SPRITESHEET_PATH;
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
        //this.boardMessages = new CSBoardMessage(width, height);
        this.memorizeMessage = new CSMemorizeMessage(width, height);
        this.modelEmotes = new CSEmotes(width, height, 186);
        this.clefairy = new CSClefairy(width, height);
        //this.arrows = new CSArrows(width, height);
        //this.ditto = new CSDitto(width, height);
        //this.dittoEmotes = new CSEmotes(width, height, dy!)
        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
        this.aMoves = [];
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        if(this.started) {
            this.checkState();
            if(this.ended) {
                this.endGame();
            }
        } else {
            this.startGame();
        }
    }

    handleAction(oEvent) {

        // Check if key pressed is in they aGameKeys array
        const fValidateKey = function(iCurrentKeyCode) {
            if(oEvent.keyCode === iCurrentKeyCode) return true;
        }
        if(oEvent.type == "keyup" && !this.aGameKeys.find(fValidateKey)) {
            return;
        }

        // Check if game has started
        if(this.started) {
            checkState();
        } else {
            if(oEvent.keyCode === 13 || oEvent.keyCode === 32 || oEvent.type === "click") {
                this.launchGame();
            }
        }

        if(this.ended) {
            if(hasValidate) {
                this.reset();
                this.animate();
            }
        }
    }

    clearDrawing() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);
    }

    startGame() {
        this.clearDrawing();
        this.starting.draw(this);
    }

    endGame() {
        //this.gameOver.draw(this);
        console.log('Game over');
    }

    launchGame() {
        this.started = true;
        this.aMoves = [];
        this.sState = 'ia';
        this.checkState();
    }

    checkState() {
        if(this.sState === 'ia') {
            console.log('Tour de l’ia');
            this.giveMove();
            this.processIaTurn();

            // Pass the turn to the player
            this.sState = 'player';
        }
        if(this.sState === 'player') {
            this.validateMoves();
        }
    }

    giveMove() {
        // Push random move with its corresponding index in aPossibleMoves to aMoves
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)].position);
    }

    validateMoves() {
        //console.log('Tour du joueur');
        //this.sState = 'ia';
    }

    processIaTurn() {
        this.clearDrawing();
        this.memorizeMessage.draw(this);
        this.clefairy.draw(this, "model", "up"); // version animée + emote ?
        this.modelEmotes.draw(this, "careful");
        window.setTimeout(() => this.clearDrawing(), 3000);
        window.setTimeout(() => this.clefairy.animate(this, "model"), 3000);

        console.log(this.aMoves);
        console.log('process ia turn');
    }



    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
