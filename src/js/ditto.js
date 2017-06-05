class CSDitto {
    constructor(width, height) {
        this.frames = {
            "normal": {
                    "sx": 136,
                    "sy": 0,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 116) / 2,
                    "dy": 266,
                    "dw": 128,
                    "dh": 124,
            },
            "up": {
                    "sx": 136,
                    "sy": 254,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 116) / 2,
                    "dy": 266,
                    "dw": 128,
                    "dh": 124,
            },
            "right": {
                    "sx": 130,
                    "sy": 508,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 266,
                    "dw": 128,
                    "dh": 124,
            },
            "down": {
                    "sx": 130,
                    "sy": 128,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 266,
                    "dw": 128 ,
                    "dh": 124 ,
            },
            "left": {
                    "sx": 130,
                    "sy": 380,
                    "sw": 128,
                    "sh": 124,
                    "dx": (width - 128) / 2,
                    "dy": 266,
                    "dw": 128,
                    "dh": 124,
            },
        }
    }
}
