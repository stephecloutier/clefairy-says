class CSDitto {
    constructor(width, height) {
        this.frames = {
            "normal": {
                "sx": 142,
                "sy": 0,
                "sw": 142,
                "sh": 124,
                "dx": (width - 138) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
            "up": {
                "sx": 142,
                "sy": 248,
                "sw": 142,
                "sh": 124,
                "dx": (width - 138) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
            "right": {
                "sx": 142,
                "sy": 496,
                "sw": 142,
                "sh": 124,
                "dx": (width - 138) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
            "down": {
                "sx": 142,
                "sy": 124,
                "sw": 142,
                "sh": 124,
                "dx": (width - 138) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
            "left": {
                "sx": 142,
                "sy": 372,
                "sw": 142,
                "sh": 124,
                "dx": (width - 138) / 2,
                "dy": 226,
                "dw": 142,
                "dh": 124,
            },
        }
    }
}
