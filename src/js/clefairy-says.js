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
            {"key": 40, "position": "down"},
        ];

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener("load", () => {
            this.setup();
        });
        this.sprites.src = SPRITESHEET_PATH;

        this.time = {
            "start": Date.now(),
            "current": null,
            "turnStart": null,
            "actionStart": null,
        }
        this.currentStep = undefined;
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
        this.boardMessages = new CSBoardMessages(width, height);
        this.modelEmotes = new CSEmotes(width, height, 186);
        this.clefairy = new CSClefairy(width, height);
        //this.arrows = new CSArrows(width, height);
        //this.ditto = new CSDitto(width, height);
        //this.dittoEmotes = new CSEmotes(width, height, dy!)
        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.score = 0;
        this.aMoves = [];

    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));


        if(this.started) {
            this.checkState();
        }
        // update elements
        /*
        if(this.started) {
            if(this.iaTurn) {
                this.clefairy.update(this, "model");
                console.log('je mupdate');
            }
            if(this.playerTurn) {
                console.log('Player’s turn');
            }
        }
        */

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);

        if(this.started) {
            if(this.iaTurn) {
                this.processIaTurn();
            }
            if(this.playerTurn) {
                console.log('Draw player turn');
            }
            if(this.ended) {
                this.endGame();
            }
        } else {
            this.starting.draw(this);
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
            this.checkState();
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

    endGame() {
        //this.gameOver.draw(this);
        console.log('Game over');
    }

    launchGame() {
        this.started = true;
        this.initIaTurn();
        this.checkState();
    }

    checkState() {
        if(this.iaTurn) {
            this.processIaTurn();
        }
        if(this.playerTurn) {
            this.validateMoves();
        }
    }

    giveMove() {
        // Push random move with its corresponding index in aPossibleMoves to aMoves
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)].position);
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)].position);
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)].position);
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)].position);
    }

    validateMoves() {
        //console.log('Tour du joueur');
        //this.playerTurn = false;
        //this.iaTurn = true;
    }

    initIaTurn() {
        this.iaTurn = true;
        this.time.turnStart = Date.now();
        this.aMoves = [];
        this.currentStep = 0;
        this.giveMove();
    }

    processIaTurn() {
        this.time.current = Date.now();

        // Message on board phase
        if(this.time.current - this.time.turnStart < 2000) {
            this.boardMessages.draw(this, "memorize");
            this.clefairy.draw(this, "model", "up"); // version animée + emote ?
            this.modelEmotes.draw(this, "careful");
            this.time.actionStart = Date.now();
        }

        // Dancing + arrows phase
        if(this.time.current - this.time.turnStart >= 2000) {
            this.time.current = Date.now();
            this.clefairy.draw(this, "model", this.aMoves[this.currentStep]);
            if((this.time.current - this.time.actionStart > 1000) && this.currentStep < this.aMoves.length) {
                this.currentStep++;
                this.time.actionStart = Date.now();
            }
            if(this.currentStep >= this.aMoves.length) {
                this.iaTurn = false;
                this.playerTurn = true;
            }
        }
    }

    // processPlayerTurn(){}

    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
