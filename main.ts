function setze_Initialwerte () {
    numPeople = 24
    nteStatisch = 4
}
function timerImmun (sprite: Sprite) {
    setTimeout(function () {
    info.changeScoreBy(-1)
        setImmun(sprite)
    }, 8000)
}
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
let otherSpriteStatus = 0
let spriteStatus = 0
let nteStatisch = 0
let iter = 0
let status = 0
let numPeople = 0
let immun = 0
let infiziert = 0
let gesund = 0
let personenArray: Sprite[] = []
let personenStatusArray: number[] = []
setze_Initialwerte()
let spriteStatus2 = 0
let neuePerson: Sprite = null
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
info.setScore(0)
