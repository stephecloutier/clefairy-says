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
            "validationStart": null,
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
        this.modelEmotes = new CSEmotes(width, "happy", 186);
        this.dittoEmotes = new CSEmotes(width, "happy", 365);
        this.clefairy = new CSClefairy(width, "clefairy", "normal");
        this.ditto = new CSClefairy(width, "ditto", "normal");
        this.lifes = [new CSLife("alive", 0), new CSLife("alive", 1), new CSLife("alive", 2), new CSLife("alive", 3), new CSLife("alive", 4)];

        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.playerActionStart = false;
        this.playerMovesValidation = false;
        this.score = 0;
        this.errorsCount = 0;
        this.aIaMoves = [];
        this.aPlayerMoves = [];
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);
        this.clefairy.draw(this);
        if(this.modelEmotes.display) {
            this.modelEmotes.draw(this);
        }
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
        if(this.dittoEmotes.display) {
            this.dittoEmotes.draw(this);
        }
        if(this.lifes.display) {
            for(let i = 0; i < this.lifes.length; i++) {
                this.lifes[i].draw(this);
            }
        }
    }

    launchGame() {
        this.started = true;
        this.initIaTurn();
        this.checkState();
    }

    giveMove() {
        // Create arrow with random index in aPossibleMoves and push it to aIaMoves
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        console.log(this.aIaMoves);
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
        this.aIaMoves = [];
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
        this.modelEmotes.emote = "careful";
        this.dittoEmotes.display = false;
        this.time.actionStart = Date.now();
    }

    iaDancingPhase() {
        this.modelEmotes.display = false;
        this.time.current = Date.now();
        if(this.time.current - this.time.actionStart > 1000) {
            this.clefairy.direction = "normal";
        } else {
            this.clefairy.direction = this.aIaMoves[this.currentStep].direction;
        }
        this.iaArrowsPhase();
        if((this.time.current - this.time.actionStart > 1400) && this.currentStep < this.aIaMoves.length) {
            this.currentStep++;
            this.time.actionStart = Date.now();
        }
        if(this.currentStep >= this.aIaMoves.length) {
            this.iaTurn = false;
            this.initPlayerTurn();
        }
    }

    iaArrowsPhase() {
        this.boardMessages.display = false;
        for(let i = 0; i <= this.currentStep; i++) {
            this.aIaMoves[i].draw(this);
        }
    }

    initPlayerTurn() {
        this.playerTurn = true;
        this.boardMessages.display = true;
        this.dittoEmotes.display = false;
        this.aPlayerMoves = [];
        this.time.turnStart = Date.now();
        this.currentStep = 0;
    }


    processPlayerTurn(){
        this.time.current = Date.now();
        this.boardMessages.message = "playerTurn";
        if(this.time.current - this.time.turnStart > 1000) {
            this.boardMessages.display = false;
            if(this.aPlayerMoves.length < this.aIaMoves.length && (this.time.current - this.time.playerAction > 500 || !this.time.playerAction)) {
                this.playerActionStart = true;
                this.playerArrowsPhase();
            } else {
                this.playerArrowsPhase();
                this.playerActionStart = false;
                if(this.time.current - this.time.playerAction > 1000) {
                    this.playerMovesValidation = true;
                    this.validateMoves();
                }
            }
        }
        if(!this.playerMovesValidation) {
            this.time.validationStart = Date.now();
            if(this.time.current - this.time.playerAction > 500) {
                this.ditto.direction = "normal";
                this.dittoEmotes.display = false;
            }
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
        this.time.current = Date.now();
        this.lifes.display = true;
        this.lifes.status = "alive";
        if(this.currentStep < this.aPlayerMoves.length) {
            this.clefairy.direction = this.aIaMoves[this.currentStep].direction;
            this.ditto.direction = this.aPlayerMoves[this.currentStep].direction;
            this.modelEmotes.display = true;
            this.dittoEmotes.display = true;
            if(this.aPlayerMoves[this.currentStep].direction !== this.aIaMoves[this.currentStep].direction) {
                this.modelEmotes.emote = "upset";
                this.dittoEmotes.emote = "careful";
            } else {
                this.modelEmotes.emote = "happy";
                this.dittoEmotes.emote = "music";
            }
        }
        if(this.time.current - this.time.validationStart > 500) {
            this.clefairy.direction = "normal";
            this.ditto.direction = "normal";
        }
        if((this.time.current - this.time.validationStart > 1000) && this.currentStep < this.aPlayerMoves.length) {
            if(this.aPlayerMoves[this.currentStep].direction !== this.aIaMoves[this.currentStep].direction) {
                this.errorsCount++;
                this.lifes[this.errorsCount - 1].status = "dead";
                this.lifes[this.errorsCount - 1].index = [this.errorsCount - 1]; // dead index ne s'incrémente pas
            }
            this.currentStep++;
            this.time.validationStart = Date.now();
        }
        if(this.currentStep >= this.aPlayerMoves.length) {
            console.log(this.errorsCount);
            this.modelEmotes.display = false;
            this.dittoEmotes.display = false;
        }
    }


    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
