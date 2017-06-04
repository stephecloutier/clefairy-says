/* clefairy-says
 *
 * /clefairy.js - Clefairy says main class
 *
 * coded by Stéphanie Cloutier
 */

const SPRITESHEET_PATH = "../resources/sprite_sheet.png";

class Clefairy {
    constructor({canvas, context, width, height}) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null; // what is this ?

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

        this.animate();
    }

    reset() {
        let {width, height} = this;

        this.background = new CSBackground(width, height);
        this.starting = new CSStarting(width, height);
        this.arrows = new CSArrows(width, height);
        this.ditto = new CSDitto(width, height);
        this.gameOver = new CSGameOver(width, height);

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));

        // check game state
        if(this.started) {
            this.checkState();
        }
        // update elements (TODO)
        //if(this.started) {}

        // draw
        this.context.clearRect(0, 0, this.width, this.height);
        this.background.draw(this);
        // TODO

    }

}
