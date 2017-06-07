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
            {"key": 37, "direction": "left"},
            {"key": 38, "direction": "up"},
            {"key": 39, "direction": "right"},
            {"key": 40, "direction": "down"},
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
        this.boardMessages = new CSBoardMessages(width, "gameTitle", true);
        this.modelEmotes = new CSEmotes(width, height, 186);
        //this.dittoEmotes = new CSEmotes(width, height, dy!)
        this.clefairy = new CSClefairy(width, "clefairy", "normal");
        this.ditto = new CSClefairy(width, "ditto", "normal");

        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.playerActionStart = false;
        this.playerMovesValidation = false;
        this.score = 0;
        this.aMoves = [];
        this.aPlayerMoves = [];
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);
        this.clefairy.draw(this);
        if(this.boardMessages.display) {
            this.boardMessages.draw(this);
        }
        // check state of the game
        if(this.started) {
            this.ditto.draw(this);
            this.checkState();
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
            if(this.playerTurn) {
                if(this.playerActionStart) {
                    if(oEvent.keyCode === 37 || oEvent.keyCode === 38 || oEvent.keyCode === 39 || oEvent.keyCode === 40 ) {
                        this.addPlayerMove(oEvent.keyCode);
                        this.time.playerAction = Date.now();
                    }
                }
            }
        } else {
            if(oEvent.keyCode === 13 || oEvent.keyCode === 32 || oEvent.type === "click") {
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

    checkState() {
        if(this.iaTurn) {
            this.processIaTurn();
        }
        if(this.playerTurn) {
            this.processPlayerTurn();
        }
    }

    launchGame() {
        this.started = true;
        this.initIaTurn();
        this.checkState();
    }

    giveMove() {
        // Create arrow with random index in aPossibleMoves and push it to aMoves
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aMoves.length));
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aMoves.length));
        console.log(this.aMoves);
    }

    addPlayerMove(keyCode) {
        for(let i = 0; i < this.aPossibleMoves.length; i++) {
            if(this.aPossibleMoves[i].key === keyCode) {
                this.aPlayerMoves.push(new CSArrow(this.aPossibleMoves[i].direction, this.aPlayerMoves.length));
                this.ditto.direction = this.aPlayerMoves[this.aPlayerMoves.length - 1].direction;
                console.log(this.aPossibleMoves[i].direction);
            }
        }
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

        if(this.time.current - this.time.turnStart < 2000) {
            this.iaIntroPhase();
        }
        if(this.time.current - this.time.turnStart >= 2000) {
            this.iaDancingPhase();
        }
    }

    iaIntroPhase() {
        this.boardMessages.message = "memorize";
        this.modelEmotes.draw(this, "careful");
        this.time.actionStart = Date.now();
    }

    iaDancingPhase() {
        this.time.current = Date.now();
        if(this.time.current - this.time.actionStart > 1000) {
            this.clefairy.direction = "normal";
        } else {
            this.clefairy.direction = this.aMoves[this.currentStep].direction;
        }
        this.iaArrowsPhase();
        if((this.time.current - this.time.actionStart > 1400) && this.currentStep < this.aMoves.length) {
            this.currentStep++;
            this.time.actionStart = Date.now();
        }
        if(this.currentStep >= this.aMoves.length) {
            this.iaTurn = false;
            this.initPlayerTurn();
        }
    }

    iaArrowsPhase() {
        this.boardMessages.display = false;
        for(let i = 0; i <= this.currentStep; i++) {
            this.aMoves[i].draw(this);
        }
    }

    initPlayerTurn() {
        this.playerTurn = true;
        this.boardMessages.display = true;
        this.aPlayerMoves = [];
        this.time.turnStart = Date.now();
    }


    processPlayerTurn(){
        this.time.current = Date.now();
        this.boardMessages.message = "playerTurn";
        if(this.time.current - this.time.turnStart > 1000) {
            this.boardMessages.display = false;
            if(this.aPlayerMoves.length < this.aMoves.length && (this.time.current - this.time.playerAction > 500 || !this.time.playerAction)) {
                this.playerActionStart = true;
                this.playerArrowsPhase();
            } else {
                this.playerArrowsPhase();
                this.playerActionStart = false;
                if(this.time.current - this.time.playerAction > 1000) {
                    this.validateMoves();
                }
            }
        }
        if(this.time.current - this.time.playerAction > 500) {
            this.ditto.direction = "normal";
        }
    }

    playerArrowsPhase() {
        if(!this.playerMovesValidation) {
            for(let i = 0; i < this.aPlayerMoves.length; i++) {
                this.aPlayerMoves[i].draw(this);
            }
        }
    }

    validateMoves() {
        this.playerMovesValidation = true;
        for(let i = 0; i <= this.aPlayerMoves.length; i++) {
            this.ditto.direction = this.aPlayerMoves[i].direction;
        }
    }



    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
