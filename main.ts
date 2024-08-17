function marioYay () {
    if (marioYays.length == 0) {
        marioYays = [
        "08_001_21_0574",
        "08_002_23_0888",
        "08_003_22_1097",
        "08_013_21_1462",
        "08_016_25_1332",
        "08_018_25_1620",
        "08_022_24_2412",
        "08_023_24_1800",
        "08_024_24_1404",
        "08_042_21_0548",
        "08_044_18_1071",
        "08_057_19_0548",
        "08_058_19_1018",
        "08_059_19_0914",
        "08_060_25_1619",
        "08_069_22_1097",
        "08_084_21_0864",
        "08_090_23_0720",
        "08_106_18_1152",
        "08_109_19_1044",
        "08_111_19_1080",
        "08_127_23_0936",
        "08_128_21_1080",
        "08_129_22_1080",
        "08_130_22_1044",
        "08_131_22_1080",
        "08_132_22_1008",
        "08_133_22_1080",
        "08_134_22_1080",
        "08_135_22_1080",
        "08_137_22_1080",
        "08_138_23_1080",
        "08_139_23_0972",
        "08_152_22_0756",
        "08_153_22_0828"
        ]
        marioYays = shuffleList(marioYays)
    }
    return marioYays.shift()
}
function digitsClear () {
    digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
    digits.clear()
}
function awaitPlayer () {
    Connected.showUserNumber(3, Connected.readColor())
    while (thePlayer == "") {
        thisColor = Math.round(Connected.readColor())
        colorReads.push(thisColor)
        if (thisColor == colorReads.removeAt(0)) {
            if (isNearly(167, thisColor, 3)) {
                Connected.showUserText(5, "" + thisColor + " green")
                thePlayer = "sailor"
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
    }
    Connected.showUserText(4, thePlayer)
    readyInstructions = false
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
        basic.pause(playSleep(magicianRight()))
    } else {
        basic.pause(playSleep(magicianLeft()))
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
            playSleep(marioYay())
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
        basic.pause(playSleep(marioNay()))
        if (thisPosition == "H") {
            radioSay("H", "Mine", true)
        } else {
            radioSay("I", "Mine", true)
        }
    } else {
        basic.pause(playSleep(marioYay()))
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
    radioSay("Intro", "1", true)
    basic.pause(playSleep("06_046_20_3500"))
    radioSay("Intro", "2", true)
    basic.pause(playSleep("05_001_24_1500"))
    if (checkNoPlayer()) {
        radioSay("Intro", "3", true)
        basic.pause(playSleep("10_006_23_1800"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "4", true)
        basic.pause(playSleep("05_002_23_3800"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "5", true)
        basic.pause(playSleep("10_060_18_3500"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "6", true)
        basic.pause(playSleep("05_003_23_4000"))
        readyInstructions = true
    }
}
function bowserSay () {
    if (bowserSays.length == 0) {
        bowserSays = [
        "07_010_20_2000",
        "07_012_20_2000",
        "07_013",
        "07_014",
        "07_015",
        "07_016",
        "07_017",
        "07_032",
        "07_035",
        "07_036"
        ]
        bowserSays = shuffleList(bowserSays)
    }
    return bowserSays.shift()
}
function potVolume (factor25: number) {
    thePotSays = Math.round(factor25 * pins.map(
    pins.analogReadPin(AnalogPin.P10),
    0,
    1023,
    0,
    1
    ))
    return thePotSays
}
function failSound () {
    if (failSounds.length == 0) {
        failSounds = ["001", "", ""]
        failSounds = shuffleList(failSounds)
    }
    return failSounds.shift()
}
function readyToGo () {
    listenGo = true
    Connected.setVolume(potVolume(23))
    if (firstRun) {
        Connected.folderPlay("05", "020")
        basic.pause(3000)
        Connected.folderPlay("05", "021")
        basic.pause(3000)
        Connected.folderPlay("05", "022")
        firstRun = false
        basic.pause(1500)
    } else {
        Connected.folderPlay("05", "023")
        basic.pause(4000)
    }
    Connected.oledClear()
    Connected.showUserText(2, "hold Mario at")
    Connected.showUserText(3, "the entryway")
    Connected.showUserText(4, "and press blue")
    Connected.showUserText(5, "button [C]")
    while (!(isReady)) {
        Connected.showUserText(6, "...")
        basic.pause(200)
        Connected.showUserText(6, "")
        basic.pause(200)
    }
    listenGo = false
    playSleep(letsGo())
    Connected.oledClear()
    Connected.showUserText(3, "HERE WE GO!!!")
    isReady = false
    return true
}
function stepOnD (theMines: string) {
    if (theMines.indexOf("D") >= 0) {
        passed = false
        radioSay("D", "Mine", true)
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("D", "Step", true)
        setLasers(true, true, true)
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
function dragonSay () {
    if (dragonSays.length == 0) {
        dragonSays = [
        "001",
        "004",
        "005",
        "007",
        "008",
        "030",
        "031",
        "041",
        "042",
        "043",
        "044",
        "045",
        "046",
        "049",
        "050",
        "051",
        "053",
        "054",
        "055",
        "056",
        "058",
        "062"
        ]
        dragonSays = shuffleList(dragonSays)
    }
    return dragonSays.shift()
}
function playSleep (folder_file_vol_length: string) {
    thisFolder = folder_file_vol_length.substr(0, 2)
    thisFile = folder_file_vol_length.substr(3, 3)
    thisVolume = folder_file_vol_length.substr(7, 2)
    thisLength = folder_file_vol_length.substr(10, 4)
    for (let index = 0; index < 0; index++) {
        Connected.showUserText(4, "folder: " + thisFolder)
        Connected.showUserText(5, "file: " + thisFile)
        Connected.showUserText(6, "volume: " + thisVolume)
        Connected.showUserText(7, "length: " + thisLength)
    }
    Connected.setVolume(Math.round(parseFloat(thisVolume) * pins.map(
    pins.analogReadPin(AnalogPin.P10),
    0,
    1023,
    0,
    1
    )))
    Connected.folderPlay(thisFolder, thisFile)
    return parseFloat(thisLength)
}
Connected.onGesture(Connected.GestureType.Forward, function () {
    Connected.showUserText(2, "gesture forward")
    gestureGo()
})
function runInstructions () {
    introGo = true
    readyInstructions = false
    radioSay("Intro", "10", true)
    radioSay("Intro", "11", true)
    if (checkNoPlayer()) {
        radioSay("Intro", "12", true)
        basic.pause(playSleep("06_011_20_1900"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "13", true)
        basic.pause(playSleep("05_006_23_3600"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "15", true)
        basic.pause(playSleep("05_007_23_6900"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "16", true)
        basic.pause(playSleep("05_008_23_3500"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "17", true)
        basic.pause(playSleep("05_009_23_2100"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "18", true)
        basic.pause(playSleep("05_010_23_2700"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "19", true)
        basic.pause(1000)
        basic.pause(playSleep("05_011_23_0000"))
        digits = Connected.tm1637Create(Connected.DigitalRJPin.J5)
        for (let index4 = 0; index4 <= 4; index4++) {
            digits.showNumber(index4)
            basic.pause(60)
        }
        basic.pause(500)
        for (let index42 = 0; index42 <= 4; index42++) {
            basic.pause(150)
            digits.showNumber(4 - index42)
            basic.pause(150)
        }
        basic.pause(0)
        digits.clear()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "20", true)
        basic.pause(playSleep("05_012_23_0000"))
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
        radioSay("Intro", "21", true)
        scoreCircle.setPixelColor(4, Connected.colors(Connected.NeoPixelColors.Green))
        scoreCircle.show()
        basic.pause(playSleep("05_013_23_1400"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "22", true)
        scoreCircle.setPixelColor(5, theYellow)
        scoreCircle.show()
        basic.pause(playSleep("05_014_23_1700"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "23", true)
        scoreCircle.setPixelColor(6, theOrange)
        scoreCircle.show()
        basic.pause(playSleep("05_015_23_1500"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "24", true)
        scoreCircle.setPixelColor(7, Connected.colors(Connected.NeoPixelColors.Red))
        scoreCircle.show()
        basic.pause(playSleep("05_016_23_1500"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "25", true)
        basic.pause(playSleep("05_017_23_0000"))
        scoreCircle.showColor(Connected.colors(Connected.NeoPixelColors.Red))
        scoreCircle.show()
        basic.pause(2700)
        scoreCircle.clear()
        scoreCircle.show()
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "26", true)
        basic.pause(playSleep("05_018_23_2500"))
    }
    if (checkNoPlayer()) {
        radioSay("Intro", "27", true)
        basic.pause(playSleep("05_019_23_2600"))
    }
    radioSay("Intro", "28", true)
    readyInstructions = true
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
function marioNay () {
    if (marioNays.length == 0) {
        marioNays = [
        "08_004_23_0417",
        "08_011_21_1619",
        "08_019_25_1512",
        "08_020_25_1512",
        "08_021_25_2664",
        "08_037_21_0862",
        "08_038_21_2088",
        "08_040_21_1071",
        "08_041_21_1071",
        "08_056_20_1227",
        "08_061_25_2638",
        "08_068_23_1593",
        "08_078_23_0648",
        "08_081_18_2844",
        "08_095_20_1008",
        "08_099_23_0792",
        "08_121_20_2448",
        "08_123_22_0612",
        "08_124_20_2916",
        "08_163_22_0864"
        ]
        marioNays = shuffleList(marioNays)
    }
    return marioNays.shift()
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
        } else if (Effect == "Mine") {
            sendValue = 2
        } else if (Effect == "Win") {
            sendValue = 3
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
    setLasers(true, true, true)
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
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("B", "Step", true)
        setLasers(true, true, true)
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
function warioSay () {
    if (warioSays.length == 0) {
        warioSays = [
        "026",
        "025",
        "024",
        "020",
        "016",
        "014",
        "011",
        "007",
        "001",
        "002"
        ]
        warioSays = shuffleList(warioSays)
    }
    return warioSays.shift()
}
function magicianLeft () {
    if (magicianLefts.length == 0) {
        magicianLefts = [
        "05_025_25_5720",
        "05_028_25_6400",
        "05_029_25_5720",
        "05_032_25_5720",
        "05_034_25_8855",
        "05_035_25_5720",
        "05_038_25_6400",
        "05_039_25_5720"
        ]
        magicianLefts = shuffleList(magicianLefts)
    }
    return magicianLefts.shift()
}
function setLasers (laserLeft: boolean, laserCenter: boolean, laserRight: boolean) {
    if (laserLeft) {
        pins.digitalWritePin(DigitalPin.P6, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P6, 0)
    }
    if (laserCenter) {
        pins.digitalWritePin(DigitalPin.P5, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
    }
    if (laserRight) {
        pins.digitalWritePin(DigitalPin.P7, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P7, 0)
    }
}
Connected.onGesture(Connected.GestureType.Backward, function () {
    Connected.showUserText(2, "gesture back")
    gestureGo()
})
function yoshiHappy () {
    if (yoshiYays.length == 0) {
        yoshiYays = [
        "001",
        "003",
        "014",
        "015",
        "019",
        "020",
        "021",
        "028",
        "031",
        "033",
        "034",
        "035",
        "038",
        "041",
        "042",
        "043",
        "052",
        "068",
        "069",
        "070",
        "071"
        ]
        yoshiYays = shuffleList(yoshiYays)
    }
    return yoshiYays.shift()
}
function yoshiSad () {
    if (yoshiNays.length == 0) {
        yoshiNays = [
        "004",
        "007",
        "008",
        "009",
        "012",
        "013",
        "014",
        "016",
        "017",
        "018",
        "067",
        "066",
        "065",
        "064",
        "063",
        "062",
        "061",
        "060",
        "059",
        "053",
        "049",
        "048",
        "044",
        "030"
        ]
        yoshiNays = shuffleList(yoshiNays)
    }
    return yoshiNays.shift()
}
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
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("E", "Step", true)
        setLasers(true, true, true)
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
    radioSay("Won", "0", true)
    Connected.oledClear()
    Connected.showUserText(1, "WINNER!")
    radioSay("Won", "1", true)
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
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("G", "Step", true)
        setLasers(true, true, true)
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
function magicianRight () {
    if (magicianRights.length == 0) {
        magicianRights = [
        "05_026_25_5720",
        "05_027_25_5720",
        "05_030_25_5720",
        "05_031_25_5720",
        "05_033_25_8359",
        "05_036_25_5720",
        "05_037_25_5720",
        "05_040_25_5720"
        ]
        magicianRights = shuffleList(magicianRights)
    }
    return magicianRights.shift()
}
function letsGo () {
    if (letsGos.length == 0) {
        letsGos = [
        "08_005_21_2403",
        "08_015_22_1253",
        "08_017_25_1296",
        "08_025_24_1872",
        "08_026_20_0612",
        "08_034_20_0862",
        "08_035_22_0992",
        "08_050_20_0835",
        "08_051_20_1056",
        "08_052_20_1358",
        "08_067_25_1358",
        "08_070_25_1201",
        "08_071_24_2115",
        "08_072_24_1489",
        "08_073_24_1018",
        "08_074_25_1201",
        "08_075_23_0862",
        "08_088_20_1512",
        "08_089_20_0720",
        "08_092_21_1980",
        "08_093_22_1008",
        "08_096_21_1008",
        "08_126_22_0756",
        "08_146_22_0828"
        ]
        letsGos = shuffleList(letsGos)
    }
    return letsGos.shift()
}
function stepOnC (theMines: string) {
    if (theMines.indexOf("C") >= 0) {
        passed = false
        radioSay("C", "Mine", true)
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("C", "Step", true)
        setLasers(true, true, true)
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
        basic.pause(playSleep(marioNay()))
    } else {
        playSleep(marioYay())
        radioSay("F", "Step", true)
        setLasers(true, true, true)
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
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
    return [laserL < limitL, laserC > limitC, laserR < limitR]
}
function marioHit () {
    if (marioHits.length == 0) {
        marioHits = [
        "08_029_22_0391",
        "08_062_25_1175",
        "08_063_25_1201",
        "08_064_25_2533",
        "08_091_21_0720",
        "08_094_24_1836",
        "08_097_22_0720",
        "08_105_21_0396",
        "08_108_22_1008",
        "08_117_22_2916",
        "08_118_22_1080",
        "08_119_23_1080",
        "08_120_23_2448",
        "08_125_22_0432",
        "08_148_23_0396",
        "08_150_23_0468",
        "08_151_22_0468",
        "08_155_22_1080"
        ]
        marioHits = shuffleList(marioHits)
    }
    return marioHits.shift()
}
function lostSequence (fieldScores: any[]) {
    radioSay("Lost", "0", true)
    Connected.oledClear()
    Connected.showUserText(1, "GAME OVER")
    radioSay("Lost", "1", true)
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
    Connected.showUserNumber(3, Connected.readColor())
    return isNearly(backgroundColor, Math.round(Connected.readColor()), 3)
}
let scoreColors: number[] = []
let marioHits: string[] = []
let laserC = 0
let laserR = 0
let laserL = 0
let tries = 0
let passed4 = false
let instruction = ""
let letsGos: string[] = []
let magicianRights: string[] = []
let thisItem = ""
let listOut: string[] = []
let masterAvoidList: string[] = []
let yoshiNays: string[] = []
let yoshiYays: string[] = []
let magicianLefts: string[] = []
let warioSays: string[] = []
let sendValue = 0
let sendString = ""
let reachedFinalRow = false
let fieldScores: number[] = []
let minefields: string[] = []
let gameOver = false
let marioNays: string[] = []
let lineCount = 0
let thisLength = ""
let thisVolume = ""
let thisFile = ""
let thisFolder = ""
let dragonSays: string[] = []
let awaitingStep = false
let passed = false
let failSounds: string[] = []
let thePotSays = 0
let bowserSays: string[] = []
let winner = false
let laserBreaks: boolean[] = []
let endCountdown = 0
let beginCountdown = 0
let thisPosition = ""
let finalRowCountdown = 0
let thisColor = 0
let digits: Connected.TM1637LEDs = null
let marioYays: string[] = []
let backgroundColor = 0
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
let isReady = false
let firstRun = false
let limitC = 0
let limitR = 0
let limitL = 0
let debug = false
pins.digitalWritePin(DigitalPin.P15, 1)
debug = false
limitL = 80
limitR = 100
limitC = 50
let fieldIndex2 = 0
let introRunning = false
let buttonBlock = false
firstRun = false
isReady = false
listenAbort = false
listenIntro = false
listenGo = false
listenStart = false
introGo = false
let awaitingPlayer = true
let volumeAdjust = 60
thePlayer = ""
let btGroup = 171
btToken = "KC$"
theOrange = Connected.rgb(255, 80, 0)
theYellow = Connected.rgb(139, 128, 0)
led.enable(false)
pins.setAudioPinEnabled(false)
radio.setGroup(btGroup)
Connected.MP3SetPort(Connected.DigitalRJPin.P16)
scoreCircle = Connected.create(Connected.DigitalRJPin.P13, 8, Connected.NeoPixelMode.RGB)
scoreCircle.clear()
scoreCircle.show()
setLasers(true, true, true)
digitsClear()
Connected.oledClear()
colorReads = [0, 0]
readyInstructions = false
backgroundColor = Math.round(Connected.readColor())
backgroundColor = 187
runIntro()
awaitPlayer()
