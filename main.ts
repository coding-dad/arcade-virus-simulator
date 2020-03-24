function setzeInitialwerte_A () {
    numPeople = 32
    nteStatisch = 100
}
function setzeInitialwert_B () {
    numPeople = 32
    nteStatisch = 2
}
function timerImmun (sprite: Sprite) {
    setTimeout(function () {
        setImmun(sprite)
    }, 8000)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    reset()
    setzeInitialwert_B()
    starteSimulation()
})
function setImmun (sprite: Sprite) {
    personenStatusArray[personenArray.indexOf(sprite)] = immun
    sprite.setImage(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . b b b . . . . . . . 
. . . . . . b b b . . . . . . . 
. . . . . . b b b . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
}
function starteSimulation () {
    spriteStatus2 = 0
    personenStatusArray = []
    personenArray = []
    gesund = 0
    infiziert = 1
    immun = 2
    for (let index = 0; index <= numPeople - 1; index++) {
        status = 0
        if (index % 6 == 0) {
            status = infiziert
        }
        neuePerson = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 8 8 8 . . . . . . . 
. . . . . . 8 8 8 . . . . . . . 
. . . . . . 8 8 8 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Projectile)
        if (status == gesund) {
            setGesund(neuePerson)
        } else {
            setInfiziert(neuePerson)
        }
        neuePerson.x = Math.randomRange(0 + neuePerson.width, scene.screenWidth() - neuePerson.width)
        neuePerson.y = Math.randomRange(0 + neuePerson.height, scene.screenHeight() - neuePerson.height())
        personenArray.push(neuePerson)
        personenStatusArray.push(status)
    }
    for (let person of personenArray) {
        person.setFlag(SpriteFlag.BounceOnWall, true)
        if (iter % nteStatisch != 0) {
            person.setVelocity(Math.randomRange(-20, 20), Math.randomRange(-20, 20))
        }
        iter += 1
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    reset()
    setzeInitialwerte_A()
    starteSimulation()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    spriteStatus = personenStatusArray[personenArray.indexOf(sprite)]
    otherSpriteStatus = personenStatusArray[personenArray.indexOf(otherSprite)]
    if (spriteStatus == gesund && otherSpriteStatus == infiziert) {
        setInfiziert(sprite)
    } else if (otherSpriteStatus == gesund && spriteStatus == infiziert) {
        setInfiziert(otherSprite)
    }
})
function setInfiziert (sprite: Sprite) {
    info.changeScoreBy(1)
    personenStatusArray[personenArray.indexOf(sprite)] = infiziert
    sprite.setImage(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 2 2 2 . . . . . . . 
. . . . . . 2 2 2 . . . . . . . 
. . . . . . 2 2 2 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
    timerImmun(sprite)
}
function setGesund (sprite: Sprite) {
    personenStatusArray[personenArray.indexOf(sprite)] = gesund
    sprite.setImage(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 7 7 7 . . . . . . . 
. . . . . . 7 7 7 . . . . . . . 
. . . . . . 7 7 7 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
}
function reset () {
    for (let Wert of personenArray) {
        Wert.destroy()
    }
    info.setScore(0)
}
let otherSpriteStatus = 0
let spriteStatus = 0
let iter = 0
let status = 0
let infiziert = 0
let gesund = 0
let spriteStatus2 = 0
let immun = 0
let personenArray: Sprite[] = []
let personenStatusArray: number[] = []
let nteStatisch = 0
let numPeople = 0
let neuePerson
