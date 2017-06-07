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
        //this.dittoEmotes = new CSEmotes(width, height, dy!)
        this.clefairy = new CSClefairy(width, height);
        //this.ditto = new CSDitto(width, height);

        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.iaTurn = false;
        this.playerTurn = false;
        this.score = 0;
        this.aMoves = [];
        this.aPlayerMoves = [];
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);

        // check state of the game
        if(this.started) {
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
            this.checkState();
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
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].position, this.aMoves.length));
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].position, this.aMoves.length));
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].position, this.aMoves.length));
        this.aMoves.push(new CSArrow(this.aPossibleMoves[Math.floor(Math.random() * 4)].position, this.aMoves.length));

        console.log(this.aMoves);

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
        console.log(this.aMoves);
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
        this.boardMessages.draw(this, "memorize");
        this.clefairy.draw(this, "model", "normal"); // version animée + emote ?
        this.modelEmotes.draw(this, "careful");
        this.time.actionStart = Date.now();
    }

    iaDancingPhase() {
        this.time.current = Date.now();
        if(this.time.current - this.time.actionStart > 1000) {
            this.clefairy.draw(this, "model", "normal");
        } else {
            this.clefairy.draw(this, "model", this.aMoves[this.currentStep].direction);
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
        for(let i = 0; i <= this.currentStep; i++) {
            this.aMoves[i].draw(this);
        }
    }

    initPlayerTurn() {
        this.playerTurn = true;
        this.aPlayerMoves = [];
        this.time.turnStart = Date.now();
        console.log('init player turn');
    }


    processPlayerTurn(){
        this.clefairy.draw(this, "model", "normal");
        this.boardMessages.draw(this, "playerTurn");
    }

    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
