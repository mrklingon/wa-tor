function mkShark () {
    if (30 > chkDensity()) {
        temp = game.createSprite(2, 2)
        SHARK.push(temp)
        sharkl.push(10)
    }
}
function chkDensity () {
    let list: number[] = []
    return list.length + SHARK.length
}
function mkFish () {
    if (30 > chkDensity()) {
        temp = game.createSprite(2, 2)
        fish.push(temp)
        fishl.push(0)
    }
}
input.onButtonPressed(Button.A, function () {
    pause2 += 1
    basic.clearScreen()
    basic.showString(convertToText(fish.length))
    basic.pause(2000)
    pause2 = 0
})
input.onButtonPressed(Button.B, function () {
    pause2 += 1
    basic.clearScreen()
    basic.showString(convertToText(SHARK.length))
    basic.pause(2000)
    pause2 = 0
})
let sc = 0
let temp: game.LedSprite = null
let pause2 = 0
let sharkl: number[] = []
let SHARK: game.LedSprite[] = []
let fishl: number[] = []
let fish: game.LedSprite[] = []
images.createBigImage(`
    . . . . . . . . . .
    . # . # . . # . . .
    # # # . . . . . . .
    . # . # . . . # . .
    . . . . . . . . . .
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . # . . . . . .
    . . # # # . # . . .
    . # # # # # . . . .
    . . # # # . # . . .
    . . . . . . . . . .
    `).scrollImage(1, 200)
fish = [game.createSprite(2, 2), game.createSprite(0, 0)]
fishl = [0, 0]
SHARK = [game.createSprite(4, 4), game.createSprite(3, 3)]
sharkl = [10, 10]
game.setLife(2)
pause2 = 0
loops.everyInterval(500, function () {
    sc += 1
    if (0 == SHARK.length * fishl.length) {
        basic.showIcon(IconNames.Sad)
        basic.pause(1000)
        pause2 = 1
        if (0 == SHARK.length) {
            basic.showLeds(`
                . . # . .
                . # # . #
                # # # # .
                . # # . #
                . . . . .
                `)
            basic.pause(1000)
        }
        if (0 == fish.length) {
            basic.showLeds(`
                . . . . .
                . # # . #
                # # # # .
                . # # . #
                . . . . .
                `)
            basic.pause(1000)
        }
        game.setScore(sc)
        game.gameOver()
    }
})
basic.forever(function () {
    if (pause2 == 0) {
        for (let value of SHARK) {
            value.turn(Direction.Right, randint(0, 360))
            value.move(1)
            value.ifOnEdgeBounce()
            sharkl[SHARK.indexOf(value)] = sharkl[SHARK.indexOf(value)] - 1
            if (sharkl[SHARK.indexOf(value)] <= 0) {
                sharkl.removeAt(SHARK.indexOf(value))
                SHARK.removeAt(SHARK.indexOf(value))
                value.delete()
            } else {
                for (let VAL2 of fish) {
                    if (value.isTouching(VAL2)) {
                        fishl.removeAt(fish.indexOf(VAL2))
                        fish.removeAt(fish.indexOf(VAL2))
                        sharkl[SHARK.indexOf(value)] = 10
                        mkShark()
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
        for (let value2 of fish) {
            value2.turn(Direction.Right, randint(0, 360))
            value2.move(1)
            value2.ifOnEdgeBounce()
            basic.pause(100)
            fishl[fish.indexOf(value2)] = 1 + fishl[fish.indexOf(value2)]
            if (3 == fishl[fish.indexOf(value2)]) {
                fishl[fish.indexOf(value2)] = 0
                mkFish()
            }
        }
    }
})
