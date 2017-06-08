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
        this.boardMessages = [];
        this.modelEmotes = new CSEmotes(width, "happy", 186);
        this.dittoEmotes = new CSEmotes(width, "happy", 365);
        this.clefairy = new CSClefairy(width, "clefairy", "normal");
        this.ditto = new CSClefairy(width, "ditto", "normal");
        this.lifes = [new CSLife("alive", 0), new CSLife("alive", 1), new CSLife("alive", 2), new CSLife("alive", 3), new CSLife("alive", 4)];
        this.score = new CSScore(0);
        this.gameOver = new CSGameOver(width);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.playerActionStart = false;
        this.playerMovesValidation = false;
        this.validationEnded = false;
        this.gameOverAnimation = false;
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
        if(this.dittoEmotes.display) {
            this.dittoEmotes.draw(this);
        }
        for(let message in this.boardMessages) {
            this.boardMessages[message].draw(this);
        }

        // check state of the game
        if(this.started) {
            this.ditto.draw(this);
            this.checkState();
        } else if(this.ended) {
            this.over();
            this.gameOver.draw(this);
            /* Tried to animate game over, but lacking time
            if(!this.gameOverAnimation) {
                this.time.gameOver = Date.now();
                this.gameOverAnimation = true;
                this.currentStep = 0;
            }
            */
        } else {
            this.dittoEmotes.display = false;
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

        if(this.ended) {
            if(oEvent.keyCode === 13 || oEvent.keyCode === 32 || oEvent.type === "click") {
                this.reset();
                this.animate();
                this.starting.draw(this);
            }
        }
    }

    checkState() {
        if(this.iaTurn) {
            this.processIaTurn();
        }
        if(this.playerTurn) {
            this.processPlayerTurn();
        }
        if(this.lifes.display) {
            for(let i = 0; i < this.lifes.length; i++) {
                this.lifes[i].draw(this);
            }
        }
    }

    launchGame() {
        delete this.boardMessages.gameTitle;
        this.started = true;
        this.initIaTurn();
        this.checkState();
    }

    giveMove() {
        // Create arrow with random index in aPossibleMoves and push it to aIaMoves
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));
        this.aIaMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].direction, this.aIaMoves.length));

    }

    addPlayerMove(keyCode) {
        for(let i = 0; i < this.aPossibleMoves.length; i++) {
            if(this.aPossibleMoves[i].key === keyCode) {
                this.aPlayerMoves.push(new CSArrow(this.aPossibleMoves[i].direction, this.aPlayerMoves.length));
                this.ditto.direction = this.aPlayerMoves[this.aPlayerMoves.length - 1].direction;
            }
        }
    }

    initIaTurn() {
        this.iaTurn = true;
        this.lifes.display = false;
        this.time.turnStart = Date.now();
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
        this.boardMessages.memorize = new CSBoardMessage(this.width, "memorize");
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
        delete this.boardMessages.memorize;
        for(let i = 0; i <= this.currentStep; i++) {
            this.aIaMoves[i].draw(this);
        }
    }

    initPlayerTurn() {
        this.playerTurn = true;
        this.boardMessages.playerTurn = new CSBoardMessage(this.width, "playerTurn");
        this.dittoEmotes.display = false;
        this.aPlayerMoves = [];
        this.time.turnStart = Date.now();
        this.currentStep = 0;
    }


    processPlayerTurn(){
        this.time.current = Date.now();
        if(this.time.current - this.time.turnStart > 1000) {
            delete this.boardMessages.playerTurn;
            if(this.aPlayerMoves.length < this.aIaMoves.length && (this.time.current - this.time.playerAction > 500 || !this.time.playerAction)) {
                this.playerActionStart = true;
                this.playerArrowsPhase();
            } else {
                this.playerArrowsPhase();
                this.playerActionStart = false;
                if(this.time.current - this.time.playerAction > 1000) {
                    this.lifes.display = true;
                    this.playerMovesValidation = true;
                    this.validateMoves();
                } else {
                    this.validationEnded = false;
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
        if(!this.playerMovesValidation || !this.playerTurn) {
            for(let i = 0; i < this.aPlayerMoves.length; i++) {
                this.aPlayerMoves[i].draw(this);
            }
        }
    }

    validateMoves() {
        this.time.current = Date.now();
        // making both clefairy follow their array moves (aIaMoves and aPlayerMoves)
        if(this.currentStep < this.aIaMoves.length) {
            this.clefairy.direction = this.aIaMoves[this.currentStep].direction;
            this.ditto.direction = this.aPlayerMoves[this.currentStep].direction;
            this.modelEmotes.display = true;
            this.dittoEmotes.display = true;
        }

        // each 500 milliseconds, changing pose to normal
        if(this.time.current - this.time.validationStart > 500) {
            this.clefairy.direction = "normal";
            this.ditto.direction = "normal";
        }

        // changing emotes according to success or fail, + errorsCount incrementation
        if(!this.validationEnded) {
            if((this.aPlayerMoves[this.currentStep].direction === this.aIaMoves[this.currentStep].direction)) {
                this.modelEmotes.emote = "happy";
                this.dittoEmotes.emote = "music";
                if((this.time.current - this.time.validationStart > 1000) && this.currentStep < this.aIaMoves.length) {
                    this.currentStep++;
                    this.time.validationStart = Date.now();
                    this.score.increment();
                    //console.log(this.score.numbers[3].numbers.sy);
                }
            } else {
                this.modelEmotes.emote = "upset";
                this.dittoEmotes.emote = "careful";
                if((this.time.current - this.time.validationStart > 1000) && this.currentStep < this.aIaMoves.length) {
                    this.errorsCount++;
                    if(this.errorsCount <= 5) {
                        this.lifes[this.errorsCount - 1].status = "dead";
                        this.lifes[this.errorsCount - 1].index = [this.errorsCount - 1]; // dead index ne s'incrémente pas
                    }
                    this.currentStep++;
                    this.time.validationStart = Date.now();
                }
            }

            // ending validation phase when all moves have been compared
            if(this.currentStep >= this.aIaMoves.length) {
                this.validationEnded = true;
            }
        } else {
            this.validationEnd();
        }

    }

    validationEnd() {
        this.time.current = Date.now();

        this.modelEmotes.display = false;
        this.dittoEmotes.display = false;

        if(this.time.current - this.time.validationStart > 1500) {
            if(this.errorsCount >= 5) {
                this.errorsCount = 5;
                this.started = false;
                this.ended = true;
            } else {
                this.playerTurn = false;
                this.playerAction = false;
                this.playerMovesValidation = false;
                this.initIaTurn();
            }
        }
    }

    over() {
        this.boardMessages.gameOver = new CSBoardMessage(this.width, "gameOver");
        this.boardMessages.score = new CSBoardMessage(this.width, "score");
        this.score.draw(this);
        this.ditto.draw(this);
        this.dittoEmotes.display = true;
        this.dittoEmotes.emote = "sad";
    }

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
