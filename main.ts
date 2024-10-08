function digitsClear () {
    digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
    digits.clear()
}
function awaitPlayer () {
    radioSay("Intro", "30", true)
    Connected.showUserNumber(3, Connected.readColor())
    while (excelString == "") {
        thisColor = Math.round(Connected.readColor())
        colorReads.push(thisColor)
        if (thisColor == colorReads.removeAt(0)) {
            if (isNearly(167, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " green")
                excelString = ""
            } else if (isNearly(43, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " yellow")
            } else if (isNearly(176, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " blue")
            } else if (isNearly(331, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " red")
            } else if (isNearly(331, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " pink")
            } else if (isNearly(143, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " gray")
            }
        }
        basic.pause(300)
    }
    readyInstructions = false
    thePlayer = excelString
    Connected.showUserText(4, thePlayer)
    radioSay("Intro", "31", true)
    startGame()
}
function isNearly (reference: number, reading: number, tolerance: number) {
    if (reading >= reference - tolerance && reading <= reference + tolerance) {
        return true
    } else {
        return false
    }
}
function tryFinalRow (startPosition: string, minePosition: string) {
    Connected.showUserText(1, "start " + startPosition)
    Connected.showUserText(2, "mine " + minePosition)
    if (minePosition == "H") {
        basic.pause(null)
    } else {
        basic.pause(null)
    }
    finalRowCountdown = 6
    thisPosition = startPosition
    beginCountdown = input.runningTime()
    endCountdown = beginCountdown + finalRowCountdown * 1000
    digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
    while (input.runningTime() < endCountdown) {
        digits.showNumber(Math.round((endCountdown - input.runningTime()) / 1000 * 2))
        basic.pause(20)
        laserBreaks = laserScan()
        if (laserBreaks[1]) {
            if (thisPosition == "H") {
                thisPosition = "I"
                radioSay("I", "Step", true)
            } else {
                thisPosition = "H"
                radioSay("H", "Step", true)
            }
            basic.pause(1000)
        }
    }
    winner = false
    if (thisPosition == minePosition) {
        basic.pause(null)
        if (thisPosition == "H") {
            radioSay("H", "Mine", true)
        } else {
            radioSay("I", "Mine", true)
        }
    } else {
        basic.pause(null)
        winner = true
        if (thisPosition == "H") {
            radioSay("H", "Win", true)
        } else {
            radioSay("I", "Win", true)
        }
    }
    return winner
}
function runIntro () {
    radioSay("Intro", "0", true)
    introLength = 0
    radioSay("Intro", convertToText(introLength), true)
    basic.pause(introLength)
    radioSay("Intro", "1", true)
    basic.pause(400)
    if (checkNoPlayer()) {
        radioSay("Intro", "2", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "3", true)
        readyInstructions = true
    }
    radioSay("Intro", "4", true)
}
function readyToGo () {
    radioSay("Intro", "32", true)
    Connected.setVolume(0)
    if (firstRun) {
        Connected.folderPlay("05", "020")
        basic.pause(2000)
        firstRun = false
    } else {
        Connected.folderPlay("05", "023")
        basic.pause(2000)
    }
    radioSay("Intro", "33", true)
    basic.pause(2000)
    while (Connected.ultrasoundSensor(Connected.DigitalRJPin.P3, Connected.Distance_Unit_List.Distance_Unit_cm) >= 10) {
        Connected.showUserText(6, "waiting")
        basic.pause(400)
    }
    Connected.showUserText(6, "")
    radioSay("Intro", "34", true)
    return true
}
function stepOnD (theMines: string) {
    if (theMines.indexOf("D") >= 0) {
        passed = false
        radioSay("D", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("D", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[2]) {
                awaitingStep = false
                stepOnF(theMines)
            } else if (laserBreaks[1]) {
                awaitingStep = false
                stepOnE(theMines)
            }
        }
    }
}
function gestureGo () {
    if (readyInstructions) {
        readyInstructions = false
        runInstructions()
    }
}
Connected.onGesture(Connected.GestureType.Forward, function () {
    Connected.showUserText(2, "gesture forward")
    gestureGo()
})
function runInstructions () {
    introGo = true
    readyInstructions = false
    if (checkNoPlayer()) {
        radioSay("Intro", "6", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "7", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "8", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "9", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "10", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "11", true)
        digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
        for (let index4 = 0; index4 <= 4; index4++) {
            digits.showNumber(index4)
            basic.pause(60)
        }
        basic.pause(1000)
        for (let index42 = 0; index42 <= 4; index42++) {
            basic.pause(150)
            digits.showNumber(4 - index42)
            basic.pause(150)
        }
        basic.pause(0)
        digits.clear()
        basic.pause(1300)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "12", true)
        scoreCircle.clear()
        scoreCircle.setPixelColor(0, Connected.colors(Connected.NeoPixelColors.Red))
        scoreCircle.setPixelColor(1, theOrange)
        scoreCircle.setPixelColor(2, theYellow)
        scoreCircle.setPixelColor(3, Connected.colors(Connected.NeoPixelColors.Green))
        scoreCircle.show()
        for (let index = 0; index < 10; index++) {
            basic.pause(370)
            scoreCircle.rotate(1)
            scoreCircle.show()
        }
        scoreCircle.clear()
        scoreCircle.show()
        basic.pause(200)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "13", true)
        scoreCircle.setPixelColor(4, Connected.colors(Connected.NeoPixelColors.Green))
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "14", true)
        scoreCircle.setPixelColor(5, theYellow)
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "15", true)
        scoreCircle.setPixelColor(6, theOrange)
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "16", true)
        scoreCircle.setPixelColor(7, Connected.colors(Connected.NeoPixelColors.Red))
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "17", true)
        scoreCircle.showColor(Connected.colors(Connected.NeoPixelColors.Red))
        scoreCircle.show()
        basic.pause(2700)
        scoreCircle.clear()
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "18", true)
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "19", true)
        readyInstructions = true
    }
    radioSay("Intro", "20", true)
}
function printArray (toPrint: any[]) {
    lineCount = toPrint.length
    Connected.oledClear()
    Connected.showUserNumber(8, lineCount)
    if (lineCount > 0) {
        for (let thisLine = 0; thisLine <= lineCount - 1; thisLine++) {
            Connected.showUserText(thisLine + 1, toPrint[thisLine])
        }
    } else {
        Connected.showUserText(1, "[Empty]")
    }
}
function startGame () {
    firstRun = true
    listenAbort = false
    listenGo = false
    listenIntro = false
    listenStart = false
    Connected.oledClear()
    gameOver = false
    minefields = generateMinefields()
    fieldScores = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    for (let minefieldIndex = 0; minefieldIndex <= 7; minefieldIndex++) {
        showScoreCircle(fieldScores)
        if (debug) {
            Connected.showUserText(1, "mines: " + minefields[minefieldIndex])
        }
        radioSay("m" + minefields[minefieldIndex], convertToText(minefieldIndex), true)
        if (!(gameOver)) {
            fieldScores[minefieldIndex] = runField(minefields[minefieldIndex])
        }
        if (fieldScores[minefieldIndex] == 0) {
            gameOver = true
        }
    }
    showScoreCircle(fieldScores)
    if (gameOver) {
        lostSequence(fieldScores)
    } else {
        wonSequence(fieldScores)
    }
}
function tryField (theMines: string) {
    passed = true
    reachedFinalRow = false
    stepOnA(theMines)
    return passed
}
function radioSay (Space: string, Effect: string, Debug: boolean) {
    sendString = "" + btToken + Space
    if (Space.length == 1) {
        if (Effect == "Step") {
            sendValue = 1
        } else if (Effect == "Indicate") {
            sendValue = 2
        } else if (Effect == "Mine") {
            sendValue = 3
        } else if (Effect == "Win") {
            sendValue = 4
        } else {
        	
        }
    } else {
        sendValue = parseFloat(Effect)
    }
    radio.sendValue(sendString, sendValue)
    if (Debug) {
        Connected.showUserText(8, "" + Space + Effect)
    } else {
        basic.pause(30)
    }
}
function stepOnA (theMines: string) {
    radioSay("A", "Step", true)
    awaitingStep = readyToGo()
    basic.pause(500)
    while (awaitingStep) {
        basic.pause(20)
        laserBreaks = laserScan()
        if (laserBreaks[2]) {
            awaitingStep = false
            stepOnC(theMines)
        } else if (laserBreaks[0]) {
            awaitingStep = false
            stepOnB(theMines)
        }
    }
}
function stepOnB (theMines: string) {
    if (theMines.indexOf("B") >= 0) {
        passed = false
        radioSay("B", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("B", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[2]) {
                awaitingStep = false
                stepOnD(theMines)
            }
        }
    }
}
Connected.onGesture(Connected.GestureType.Backward, function () {
    Connected.showUserText(2, "gesture back")
    gestureGo()
})
function generateMinefields () {
    masterAvoidList = [
    "CEH",
    "CEI",
    "CFH",
    "CFI",
    "BDH",
    "BDI",
    "BGH",
    "BGI"
    ]
    return shuffleList(masterAvoidList)
}
function stepOnE (theMines: string) {
    if (theMines.indexOf("E") >= 0) {
        passed = false
        radioSay("E", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("E", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[1]) {
                awaitingStep = false
                stepOnD(theMines)
            } else if (laserBreaks[0]) {
                awaitingStep = false
                stepOnG(theMines)
            }
        }
    }
}
function wonSequence (fieldScores: any[]) {
    digitsClear()
    readyInstructions = false
    radioSay("Won", "0", true)
    Connected.oledClear()
    Connected.showUserText(1, "WINNER!")
    basic.pause(2000)
    radioSay("Won", "1", true)
    basic.pause(2000)
    radioSay("Won", "2", true)
    basic.pause(2000)
    radioSay("Won", "3", true)
    basic.pause(2000)
    radioSay("Won", "4", true)
    basic.pause(2000)
    radioSay("Won", "5", true)
    basic.pause(2000)
    radioSay("Won", "6", true)
    basic.pause(2000)
    radioSay("Won", "7", true)
    basic.pause(2000)
    radioSay("Won", "8", true)
    basic.pause(2000)
    radioSay("Won", "9", true)
    basic.pause(2000)
    radioSay("Won", "10", true)
}
function shuffleList (listIn: string[]) {
    listOut = ["temp"]
    while (listIn.length > 0) {
        thisItem = listIn._pickRandom()
        listOut.push(thisItem)
        listIn.removeAt(listIn.indexOf(thisItem))
    }
    listOut.shift()
    return listOut
}
function stepOnG (theMines: string) {
    if (theMines.indexOf("G") >= 0) {
        passed = false
        radioSay("G", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("G", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[2]) {
                awaitingStep = false
                radioSay("I", "Step", true)
                passed = tryFinalRow("I", theMines.charAt(2))
            }
        }
    }
}
function stepOnC (theMines: string) {
    if (theMines.indexOf("C") >= 0) {
        passed = false
        radioSay("C", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("C", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[0]) {
                awaitingStep = false
                stepOnE(theMines)
            }
        }
    }
}
function stepOnF (theMines: string) {
    if (theMines.indexOf("F") >= 0) {
        passed = false
        radioSay("F", "Mine", true)
        basic.pause(null)
    } else {
        radioSay("F", "Step", true)
        awaitingStep = true
        basic.pause(1000)
        while (awaitingStep) {
            basic.pause(20)
            laserBreaks = laserScan()
            if (laserBreaks[0]) {
                awaitingStep = false
                radioSay("H", "Step", true)
                passed = tryFinalRow("H", theMines.charAt(2))
            }
        }
    }
}
Connected.onGesture(Connected.GestureType.Left, function () {
    Connected.showUserText(2, "gesture left")
    gestureGo()
})
radio.onReceivedValue(function (name, value) {
    if (name.substr(0, btToken.length) == btToken) {
        instruction = name.substr(btToken.length, name.length - btToken.length)
        if (instruction == "Intro") {
            if (value == 1) {
            	
            } else if (value == 2) {
            	
            }
        }
    }
})
Connected.onGesture(Connected.GestureType.Up, function () {
    Connected.showUserText(2, "gesture up")
    gestureGo()
})
function runField (theMines: string) {
    passed4 = false
    tries = 4
    digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
    while (!(passed4) && tries > 0) {
        digits.showNumber(tries)
        passed4 = tryField(theMines)
        if (!(passed4)) {
            tries = tries - 1
        }
        basic.pause(500)
    }
    digits.showNumber(tries)
    return tries
}
function laserScan () {
    laserL = pins.analogReadPin(AnalogPin.P0)
    laserR = pins.analogReadPin(AnalogPin.P1)
    laserC = pins.analogReadPin(AnalogPin.P2)
    if (debug) {
        Connected.showUserText(8, "L" + laserL + ("C" + laserC) + ("R" + laserR))
    }
    return [laserL < limitL, laserC < limitC, laserR < limitR]
}
function lostSequence (fieldScores: any[]) {
    radioSay("Lost", "0", true)
    scoreCircle.clear()
    scoreCircle.show()
    digitsClear()
    readyInstructions = false
    Connected.oledClear()
    Connected.showUserText(1, "GAME OVER")
    basic.pause(5000)
    radioSay("Lost", "1", true)
    basic.pause(2000)
    radioSay("Lost", "2", true)
    basic.pause(2000)
    radioSay("Lost", "3", true)
    basic.pause(2000)
    radioSay("Lost", "4", true)
    basic.pause(2000)
    radioSay("Lost", "5", true)
    basic.pause(2000)
    radioSay("Lost", "6", true)
    basic.pause(2000)
    radioSay("Lost", "7", true)
    basic.pause(2000)
    radioSay("Lost", "8", true)
    basic.pause(2000)
    radioSay("Lost", "9", true)
    basic.pause(2000)
    radioSay("Lost", "10", true)
}
Connected.onGesture(Connected.GestureType.Right, function () {
    Connected.showUserText(2, "gesture right")
    gestureGo()
})
function showScoreCircle (fieldScores: number[]) {
    scoreColors = []
    for (let scoreIndex2 = 0; scoreIndex2 <= 7; scoreIndex2++) {
        if (fieldScores[scoreIndex2] == 0) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Black))
        } else if (fieldScores[scoreIndex2] == 1) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Red))
        } else if (fieldScores[scoreIndex2] == 2) {
            scoreColors.push(theOrange)
        } else if (fieldScores[scoreIndex2] == 3) {
            scoreColors.push(theYellow)
        } else if (fieldScores[scoreIndex2] == 4) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Green))
        }
    }
    scoreCircle.setPixelColor(4, scoreColors[0])
    scoreCircle.setPixelColor(5, scoreColors[1])
    scoreCircle.setPixelColor(6, scoreColors[2])
    scoreCircle.setPixelColor(7, scoreColors[3])
    scoreCircle.setPixelColor(0, scoreColors[4])
    scoreCircle.setPixelColor(1, scoreColors[5])
    scoreCircle.setPixelColor(2, scoreColors[6])
    scoreCircle.setPixelColor(3, scoreColors[7])
    scoreCircle.show()
}
Connected.onGesture(Connected.GestureType.Down, function () {
    Connected.showUserText(2, "gesture down")
    gestureGo()
})
function checkNoPlayer () {
    return true
}
let scoreColors: number[] = []
let laserC = 0
let laserR = 0
let laserL = 0
let tries = 0
let passed4 = false
let instruction = ""
let thisItem = ""
let listOut: string[] = []
let masterAvoidList: string[] = []
let sendValue = 0
let sendString = ""
let reachedFinalRow = false
let fieldScores: number[] = []
let minefields: string[] = []
let gameOver = false
let lineCount = 0
let awaitingStep = false
let passed = false
let introLength = 0
let winner = false
let laserBreaks: boolean[] = []
let endCountdown = 0
let beginCountdown = 0
let thisPosition = ""
let finalRowCountdown = 0
let thisColor = 0
let excelString = ""
let digits: Connected.TM1637LEDs = null
let readyInstructions = false
let colorReads: number[] = []
let scoreCircle: Connected.Strip = null
let theYellow = 0
let theOrange = 0
let btToken = ""
let thePlayer = ""
let introGo = false
let listenStart = false
let listenGo = false
let listenIntro = false
let listenAbort = false
let firstRun = false
let limitC = 0
let limitR = 0
let limitL = 0
let debug = false
let isReady = false
let buttonBlock = false
let introRunning = false
let fieldIndex2 = 0
let theSeries = ""
Connected.showUserText(1, "Hello,ELECFREAKS")
pins.digitalWritePin(DigitalPin.P5, 1)
debug = true
limitL = 80
limitR = 80
limitC = 70
firstRun = false
listenAbort = false
listenIntro = false
listenGo = false
listenStart = false
introGo = false
let awaitingPlayer = true
thePlayer = ""
let btGroup = 171
btToken = "KC$"
theOrange = Connected.rgb(255, 80, 0)
theYellow = Connected.rgb(139, 128, 0)
led.enable(false)
pins.setAudioPinEnabled(false)
radio.setGroup(btGroup)
scoreCircle = Connected.create(Connected.DigitalRJPin.P13, 8, Connected.NeoPixelMode.RGB)
scoreCircle.clear()
scoreCircle.show()
digitsClear()
colorReads = [0, 0]
readyInstructions = false
let backgroundColor = 187
Connected.MP3SetPort(Connected.DigitalRJPin.P13)
Connected.execute(Connected.playType.Stop)
Connected.MP3SetPort(Connected.DigitalRJPin.P14)
Connected.execute(Connected.playType.Stop)
Connected.MP3SetPort(Connected.DigitalRJPin.P16)
Connected.execute(Connected.playType.Stop)
let songNumber = -1
let volumeA = -1
let volumeB = -1
runInstructions()
