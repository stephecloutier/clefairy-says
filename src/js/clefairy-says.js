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
        this.aGameKeys = [32, 13, 38, 40, 37, 39, 65, 66, 27, 8];
        this.aPossibleMoves = [
            {"key": 37, "direction": "left"},
            {"key": 38, "direction": "up"},
            {"key": 39, "direction": "right"},
            {"key": 40, "direction": "down"},
        ];
        this.time = {
            "start": Date.now(),
            "current": null,
            "turnStart": null,
            "actionStart": null,
            "validationStart": null,
        }
        this.currentStep = undefined;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener("load", () => {
            this.setup();
        });
        this.sprites.src = SPRITESHEET_PATH;

        // load sounds
        this.percussionMusic = new Audio("./resources/music_percussions.mp3");
        this.percussionMusic.volume = 0.2;

        this.deadMusic = new Audio("./resources/music_dead.mp3");
        this.deadMusic.volume = 0.2;

        this.clefairySounds = {
            "left": new Audio("./resources/clefairy1.mp3"),
            "up": new Audio("./resources/clefairy2.mp3"),
            "right": new Audio("./resources/clefairy3.mp3"),
            "down": new Audio("./resources/clefairy4.mp3")
        };
        this.clefairySounds.volume = 1;

        this.goodSound = new Audio("./resources/good.mp3");
        this.goodSound.volume = 0.1;
        this.wrongSound = new Audio("./resources/wrong.mp3");
        this.wrongSound.volume = 0.1;
        this.wowSound = new Audio("./resources/wow.mp3");
        this.wowSound.volume = 1;


        this.click = {};

        this.aFreeCheck = ["up", "up", "down", "down", "left", "right", "left", "right", 66, 65];
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
        this.starting = new CSStarting();
        this.boardMessages = [];
        this.modelEmotes = new CSEmotes(width, "happy", 186);
        this.dittoEmotes = new CSEmotes(width, "happy", 365);
        this.clefairy = new CSClefairy(width, "clefairy", "normal");
        this.ditto = new CSClefairy(width, "ditto", "normal");
        this.lifes = [new CSLife("alive", 0), new CSLife("alive", 1), new CSLife("alive", 2), new CSLife("alive", 3), new CSLife("alive", 4)];
        this.score = new CSScore(0);
        this.gameOver = new CSGameOver(width);
        this.goBack = new CSGoBack();

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.freePlay = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.playerActionStart = false;
        this.playerMovesValidation = false;
        this.validationEnded = false;
        this.gameOverAnimation = false;
        this.errorsCount = 0;
        this.aIaMoves = [];
        this.aPlayerMoves = [];
        this.aFreeMoves = [];
        this.deadMusic.pause();
        this.deadMusic.currentTime = 0;
        this.soundPlayed = false;
        this.win = false;
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

        // repeat music
        this.repeatMusic(this.percussionMusic, 2, 5);

        // check state of the game
        if(this.started) {
            this.ditto.draw(this);
            this.checkState();
        } else if(this.ended) {
            this.deadMusic.play();
            this.percussionMusic.pause();
            this.percussionMusic.currentTime = 0;
            this.over();
            this.gameOver.draw(this);
            /* Tried to animate game over, but lacking time
            if(!this.gameOverAnimation) {
                this.time.gameOver = Date.now();
                this.gameOverAnimation = true;
                this.currentStep = 0;
            }
            */
        } else if(this.freePlay) {
            this.percussionMusic.play();
            this.modelEmotes.emote = "heart";
            this.goBack.draw(this);
            this.boardMessages.yourTurn = new CSBoardMessage(this.width, "playerTurn");
            if(this.win) {
                delete this.boardMessages.yourTurn;
                this.boardMessages.youWon = new CSBoardMessage(this.width, "youWon");
                this.modelEmotes.emote = "happy";
                this.wowSound.play();
            }

        } else {
            this.dittoEmotes.display = false;
            this.percussionMusic.play();
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
        if(oEvent.type === "click") {
            this.canvasClick(oEvent);
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
            if(oEvent.keyCode === 13 || oEvent.keyCode === 32 || oEvent.keyCode === 37 || (oEvent.type === "click" && this.click.x < this.width / 2)) {
                if(!this.freePlay) {
                    this.launchGame();
                }
            }
            if(oEvent.keyCode === 39 || (oEvent.type === "click" && this.click.x > this.width / 2)) {
                this.launchFreePlay();
            }
        }

        if(this.freePlay) {
            if((oEvent.type === "click" && this.click.x < this.width / 2) || oEvent.keyCode === 27 || oEvent.keyCode === 8) {
                this.reset();
                this.animate();
                this.starting.draw(this);
            }

            if(oEvent.keyCode === 37 || oEvent.keyCode === 38 || oEvent.keyCode === 39 || oEvent.keyCode === 40 || oEvent.keyCode === 66 || oEvent.keyCode === 65) {
                this.addFreeMove(oEvent.keyCode);
                this.time.freeAction = Date.now();
            }
            if(oEvent.keyCode === 65) {
                this.win = this.freeCheck();
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

    canvasClick(oEvent) {
        this.click.x = oEvent.clientX - this.canvas.offsetLeft;
        this.click.y = oEvent.clientY - this.canvas.offsetTop;
    }

    checkState() {
        if(!this.freePlay) {
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
    }

    launchFreePlay() {
        delete this.boardMessages.gameTitle;
        this.freePlay = true;
    }

    addFreeMove(keyCode) {
        if(keyCode !== 65 && keyCode !== 66) {
            for(let i = 0; i < this.aPossibleMoves.length; i++) {
                if(this.aPossibleMoves[i].key === keyCode) {
                    this.aFreeMoves.push(new CSArrow(this.aPossibleMoves[i].direction, this.aFreeMoves.length));
                    this.clefairy.direction = this.aFreeMoves[this.aFreeMoves.length - 1].direction;
                    this.clefairySounds[this.aFreeMoves[this.aFreeMoves.length - 1].direction].play();
                }
            }
        } else {
            this.aFreeMoves.push(keyCode);
        }
    }

    freeCheck() {
        return this.aFreeMoves.slice(this.aFreeMoves.length - 11, this.aFreeMoves.length - 1).every((item, index) => {
            if(typeof item !== "string") {
                return item.direction === this.aFreeCheck[index];
            } else {
                return item === this.aFreeCheck[index];
            }
        });
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
    }

    addPlayerMove(keyCode) {
        for(let i = 0; i < this.aPossibleMoves.length; i++) {
            if(this.aPossibleMoves[i].key === keyCode) {
                this.aPlayerMoves.push(new CSArrow(this.aPossibleMoves[i].direction, this.aPlayerMoves.length));
                this.ditto.direction = this.aPlayerMoves[this.aPlayerMoves.length - 1].direction;
                this.clefairySounds[this.aPlayerMoves[this.aPlayerMoves.length - 1].direction].play();
            }
        }
    }

    initIaTurn() {
        this.iaTurn = true;
        this.lifes.display = false;
        this.time.turnStart = Date.now();
        this.currentStep = 0;
        this.giveMove();
        this.musicValidation = false;
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
            this.clefairySounds[this.aIaMoves[this.currentStep].direction].play();
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
            if(this.aPlayerMoves.length < this.aIaMoves.length && (this.time.current - this.time.playerAction > 1100 || !this.time.playerAction)) {
                this.playerActionStart = true;
                this.playerArrowsPhase();
            } else {
                this.playerArrowsPhase();
                this.playerActionStart = false;
                if(this.time.current - this.time.playerAction > 1600) {
                    this.lifes.display = true;
                    if(this.time.current - this.time.playerAction > 2100) {
                        this.playerMovesValidation = true;
                        this.validateMoves();
                    }
                } else {
                    this.validationEnded = false;
                }
            }
        }
        if(!this.playerMovesValidation) {
            this.time.validationStart = Date.now();
            if(this.time.current - this.time.playerAction > 900) {
                this.ditto.direction = "normal";
                this.dittoEmotes.display = false;
            }
        }
    }

    playerArrowsPhase() {
        if((!this.playerMovesValidation && !this.lifes.display) || !this.playerTurn) {
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
                if(!this.soundPlayed) {
                    this.goodSound.play();
                    this.soundPlayed = true;
                }
                if((this.time.current - this.time.validationStart > 1000) && this.currentStep < this.aIaMoves.length) {
                    this.soundPlayed = false;
                    this.currentStep++;
                    this.time.validationStart = Date.now();
                    this.score.increment();
                }
            } else {
                this.modelEmotes.emote = "upset";
                this.dittoEmotes.emote = "careful";

                if(this.errorsCount < 5) {
                    this.lifes[this.errorsCount].status = "dead";
                }
                if(!this.soundPlayed) {
                    this.wrongSound.play();
                    this.soundPlayed = true;
                }
                if((this.time.current - this.time.validationStart > 1000) && this.currentStep < this.aIaMoves.length) {
                    this.soundPlayed = false;
                    this.errorsCount++;
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

        if(this.time.current - this.time.validationStart > 2000) {
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

    repeatMusic(music, timeStart = 0, timeEnd = 0){
        if(music.currentTime >= music.duration - timeEnd) {
            music.currentTime = timeStart;
            music.play();
        }
    }
}
