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

        // init variables
        this.aGameKeys = [32, 13, 38, 40, 37, 39, 65, 66];
        this.aPossibleMoves = [37, 38, 39, 40];
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
        this.boardMessages = new CSBoardMessages(width, height);
        //this.model = new CSModel(width, height);
        //this.arrows = new CSArrows(width, height);
        //this.ditto = new CSDitto(width, height);
        //this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
        this.aMoves = [];
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // check game state
        if(this.started) {
            this.checkState();
        }

        // update elements
        if(this.started) {
            //this.moves.update();
            //this.ditto.update();
        }

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);

        if(this.started) {
            //this.moves.draw();
            //this.ditto.draw();
            if(this.ended) {
                //this.gameOver.draw();
            }
        } else {
            this.starting.animate(this);
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
        this.started = true;
        this.aMoves = [];
        this.sState = 'ia';
        this.checkState();
    }

    checkState() {
        if(this.sState === 'ia') {
            this.giveMove();
            console.log('Tour de l’ia');
            this.sState = 'player';

                    //console.log(this.boardMessages);
                    //this.boardMessages.drawMemorize(this);

            //this.boardMessages.drawMemorize(this);
        }
        if(this.sState === 'player') {
            this.validateMoves();
        }
    }

    giveMove() {
        // Push random move with its corresponding index in aPossibleMoves to aMoves
        this.aMoves.push(this.aPossibleMoves[Math.floor(Math.random() * 4)]);
    }

    validateMoves() {
        //console.log('Tour du joueur');
        //this.sState = 'ia';
    }



    // over

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}
