function mkShark () {
    game.addLife(1)
    temp = game.createSprite(2, 2)
    SHARK.push(temp)
    sharkl.push(10)
}
function mkFish () {
    game.addLife(1)
    temp = game.createSprite(2, 2)
    fish.push(temp)
    fishl.push(0)
}
input.onButtonPressed(Button.A, function () {
    pause2 += 1
    basic.clearScreen()
    basic.showString(convertToText(fish.length))
    basic.pause(1000)
    pause2 = 0
})
input.onButtonPressed(Button.B, function () {
    pause2 += 1
    basic.clearScreen()
    basic.showString(convertToText(SHARK.length))
    basic.pause(1000)
    pause2 = 0
})
let temp: game.LedSprite = null
let pause2 = 0
let sharkl: number[] = []
let SHARK: game.LedSprite[] = []
let fishl: number[] = []
let fish: game.LedSprite[] = []
fish = [game.createSprite(2, 2), game.createSprite(0, 0)]
fishl = [0, 0]
SHARK = [game.createSprite(4, 4), game.createSprite(3, 3)]
sharkl = [10, 10]
game.setLife(2)
pause2 = 0
basic.forever(function () {
    if (pause2 == 0) {
        for (let value of SHARK) {
            value.turn(Direction.Right, randint(0, 360))
            value.move(1)
            value.ifOnEdgeBounce()
            sharkl[SHARK.indexOf(value)] = sharkl[SHARK.indexOf(value)] - 1
            if (sharkl[SHARK.indexOf(value)] == 0) {
                game.removeLife(1)
                sharkl.removeAt(SHARK.indexOf(value))
                SHARK.removeAt(SHARK.indexOf(value))
                value.delete()
            } else {
                for (let VAL2 of fish) {
                    if (value.isTouching(VAL2)) {
                        fishl.removeAt(fish.indexOf(VAL2))
                        fish.removeAt(fish.indexOf(VAL2))
                        sharkl[SHARK.indexOf(value)] = 3
                        mkShark()
                        game.removeLife(1)
                        VAL2.delete()
                    }
                }
            }
            basic.pause(100)
        }
    }
})
basic.forever(function () {
    if (pause2 == 0) {
        for (let value of fish) {
            value.turn(Direction.Right, randint(0, 360))
            value.move(1)
            value.ifOnEdgeBounce()
            basic.pause(100)
            fishl[fish.indexOf(value)] = 1 + fishl[fish.indexOf(value)]
            if (3 == fishl[fish.indexOf(value)]) {
                fishl[fish.indexOf(value)] = 0
                mkFish()
            }
        }
    }
})
