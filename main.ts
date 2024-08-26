function isNearly (reference: number, reading: number, tolerance: number) {
    if (reading >= reference - tolerance && reading <= reference + tolerance) {
        return true
    } else {
        return false
    }
}
function playMusic (genre: string) {
    if (genre == "Level") {
        if (playlistLevel.length == 0) {
            playlistLevel = shuffleList(mbLevel)
        }
        thisSound = playlistLevel.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Tutorial") {
        if (playlistTutorial.length == 0) {
            playlistTutorial = shuffleList(mbTutorial)
        }
        thisSound = playlistTutorial.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Intro") {
        if (playlistIntroMusic.length == 0) {
            playlistIntroMusic = shuffleList(mbIntro)
        }
        thisSound = playlistIntroMusic.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Voices") {
    	
    } else if (genre == "Awaiting") {
        if (playlistAwaiting.length == 0) {
            playlistAwaiting = shuffleList(mbAwaiting)
        }
        thisSound = playlistAwaiting.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Won") {
        if (playlistWonMusic.length == 0) {
            playlistWonMusic = shuffleList(mbWon)
        }
        thisSound = playlistWonMusic.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Lost") {
        if (playlistLostMusic.length == 0) {
            playlistLostMusic = shuffleList(mbLost)
        }
        thisSound = playlistLostMusic.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(Math.min(0, notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4)))
    } else if (genre == "Doom") {
    	
    } else if (genre == "SFX") {
    	
    }
}
function PlaySound (category: string) {
    if (category == "Ready") {
        if (playlistReady.length == 0) {
            playlistReady = shuffleList(sbReady)
        }
        thisSound = playlistReady.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Name") {
        if (playlistName.length == 0) {
            playlistName = shuffleList(sbName)
        }
        thisSound = playlistName.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Yay") {
        if (playlistYay.length == 0) {
            playlistYay = shuffleList(sbYay)
        }
        thisSound = playlistYay.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Nay") {
        if (playlistNay.length == 0) {
            playlistNay = shuffleList(sbNay)
        }
        thisSound = playlistNay.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Intro") {
        if (playlistIntro.length == 0) {
            playlistIntro = shuffleList(sbIntro)
        }
        thisSound = playlistIntro.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Ouch") {
        if (playlistOuch.length == 0) {
            playlistOuch = shuffleList(sbOuch)
        }
        thisSound = playlistOuch.shift()
        Connected.showUserText(1, thisSound)
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Success") {
        if (playlistSuccess.length == 0) {
            playlistSuccess = shuffleList(sbSuccess)
        }
        thisSound = playlistSuccess.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Failure") {
        if (playlistFailure.length == 0) {
            playlistFailure = shuffleList(sbFailure)
        }
        thisSound = playlistFailure.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Won") {
        if (playlistWon.length == 0) {
            playlistWon = shuffleList(sbWon)
        }
        thisSound = playlistWon.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Lost") {
        if (playlistLost.length == 0) {
            playlistLost = shuffleList(sbLost)
        }
        thisSound = playlistLost.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Hurry") {
        if (playlistHurry.length == 0) {
            playlistHurry = shuffleList(sbHurry)
        }
        thisSound = playlistHurry.shift()
        relativeVolumeA = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J3))
    } else if (category == "Incorrect") {
        if (playlistIncorrect.length == 0) {
            playlistIncorrect = shuffleList(sbIncorrect)
        }
        Connected.showUserText(1, thisSound)
        thisSound = playlistIncorrect.shift()
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4))
    } else if (category == "Correct") {
        if (playlistCorrect.length == 0) {
            playlistCorrect = shuffleList(sbCorrect)
        }
        thisSound = playlistCorrect.shift()
        Connected.showUserText(1, thisSound)
        relativeVolumeB = parseFloat(thisSound.split("_")[2]) / 100
        basic.pause(notLegos.playsFor(thisSound, potRead(), notLegos.DigitalRJPin.J4))
    }
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
Connected.buttonEvent(Connected.DigitalRJPin.J2, Connected.ButtonStateList.D, function () {
    if (songNumber > 0) {
        songNumber = songNumber - 1
    }
    Connected.showUserText(2, mbLevel[songNumber])
    basic.pause(notLegos.playsFor("", potRead(), notLegos.DigitalRJPin.J4) + 300)
    Connected.showUserNumber(3, notLegos.playsFor("", potRead(), notLegos.DigitalRJPin.J4))
})
function potRead () {
    thePotSays = pins.map(
    Connected.trimpot(Connected.AnalogRJPin.J1),
    0,
    1023,
    0,
    1
    )
    return thePotSays
}
function shuffleList (listIn: string[]) {
    listCopy = []
    for (let value of listIn) {
        listCopy.push(value)
    }
    listOut = ["temp"]
    while (listCopy.length > 0) {
        thisItem = listCopy._pickRandom()
        listOut.push(thisItem)
        listCopy.removeAt(listCopy.indexOf(thisItem))
    }
    listOut.shift()
    return listOut
}
function setSounds (player: string) {
    soundString = notLegos.playerSoundString(player)
    sbName = []
    sbReady = []
    sbYay = []
    sbIntro = []
    sbNay = []
    sbOuch = []
    sbSuccess = []
    sbFailure = []
    sbWon = []
    sbLost = []
    sbHurry = []
    stringParts = soundString.split("|")
    for (let value2 of stringParts) {
        thisLetter = value2.charAt(0)
        thisSound = value2.substr(2, value2.length - 2)
        if (thisLetter == "A") {
            sbName.push(thisSound)
        } else if (thisLetter == "R") {
            sbReady.push(thisSound)
        } else if (thisLetter == "Y") {
            sbYay.push(thisSound)
        } else if (thisLetter == "I") {
            sbIntro.push(thisSound)
        } else if (thisLetter == "N") {
            sbNay.push(thisSound)
        } else if (thisLetter == "O") {
            sbOuch.push(thisSound)
        } else if (thisLetter == "S") {
            sbSuccess.push(thisSound)
        } else if (thisLetter == "F") {
            sbFailure.push(thisSound)
        } else if (thisLetter == "W") {
            sbWon.push(thisSound)
        } else if (thisLetter == "L") {
            sbLost.push(thisSound)
        } else if (thisLetter == "H") {
            sbHurry.push(thisSound)
        }
    }
}
Connected.buttonEvent(Connected.DigitalRJPin.J2, Connected.ButtonStateList.C, function () {
    songNumber = songNumber + 1
    Connected.showUserText(2, mbLevel[songNumber])
    basic.pause(notLegos.playsFor("", potRead(), notLegos.DigitalRJPin.J4) + 300)
    Connected.showUserNumber(3, notLegos.playsFor("", potRead(), notLegos.DigitalRJPin.J4))
})
function setMusic (player: string) {
    musicString = notLegos.playerMusicString(player)
    mbTutorial = []
    mbIntro = []
    sbVoices = []
    mbAwaiting = []
    mbLevel = []
    mbWon = []
    mbLost = []
    sbCorrect = []
    sbIncorrect = []
    sbDoom = []
    sbSFX = []
    stringParts = musicString.split("|")
    for (let value3 of stringParts) {
        thisLetter = value3.charAt(0)
        thisSound = value3.substr(2, value3.length - 2)
        if (thisLetter == "T") {
            mbTutorial.push(thisSound)
        } else if (thisLetter == "N") {
            mbIntro.push(thisSound)
        } else if (thisLetter == "V") {
            sbVoices.push(thisSound)
        } else if (thisLetter == "A") {
            mbAwaiting.push(thisSound)
        } else if (thisLetter == "E") {
            mbLevel.push(thisSound)
        } else if (thisLetter == "O") {
            mbWon.push(thisSound)
        } else if (thisLetter == "L") {
            mbLost.push(thisSound)
        } else if (thisLetter == "C") {
            sbCorrect.push(thisSound)
        } else if (thisLetter == "I") {
            sbIncorrect.push(thisSound)
        } else if (thisLetter == "D") {
            sbDoom.push(thisSound)
        } else if (thisLetter == "S") {
            sbSFX.push(thisSound)
        }
    }
}
let thisRead = 0
let sbSFX: string[] = []
let sbDoom: string[] = []
let sbVoices: string[] = []
let musicString = ""
let thisLetter = ""
let stringParts: string[] = []
let soundString = ""
let thisItem = ""
let listOut: string[] = []
let listCopy: string[] = []
let thePotSays = 0
let lineCount = 0
let sbCorrect: string[] = []
let playlistCorrect: string[] = []
let sbIncorrect: string[] = []
let playlistIncorrect: string[] = []
let sbHurry: string[] = []
let playlistHurry: string[] = []
let sbLost: string[] = []
let playlistLost: string[] = []
let sbWon: string[] = []
let playlistWon: string[] = []
let sbFailure: string[] = []
let playlistFailure: string[] = []
let sbSuccess: string[] = []
let playlistSuccess: string[] = []
let sbOuch: string[] = []
let playlistOuch: string[] = []
let sbIntro: string[] = []
let playlistIntro: string[] = []
let sbNay: string[] = []
let playlistNay: string[] = []
let sbYay: string[] = []
let playlistYay: string[] = []
let sbName: string[] = []
let playlistName: string[] = []
let sbReady: string[] = []
let playlistReady: string[] = []
let mbLost: string[] = []
let playlistLostMusic: string[] = []
let mbWon: string[] = []
let playlistWonMusic: string[] = []
let mbAwaiting: string[] = []
let playlistAwaiting: string[] = []
let mbIntro: string[] = []
let playlistIntroMusic: string[] = []
let mbTutorial: string[] = []
let playlistTutorial: string[] = []
let thisSound = ""
let mbLevel: string[] = []
let playlistLevel: string[] = []
let songNumber = 0
let relativeVolumeB = 0
let relativeVolumeA = 0
Connected.showUserText(1, "Hello" + "World")
Connected.MP3SetPort(Connected.DigitalRJPin.J3)
Connected.execute(Connected.playType.Stop)
Connected.MP3SetPort(Connected.DigitalRJPin.J4)
Connected.execute(Connected.playType.Stop)
relativeVolumeA = 0
relativeVolumeB = 0
songNumber = -1
let volumeA = -1
let volumeB = -1
playlistLevel = []
setSounds("Mario")
setMusic("Mario")
let lastRead = potRead()
PlaySound("Correct")
loops.everyInterval(100, function () {
    thisRead = potRead()
    if (!(isNearly(thisRead, lastRead, 0.01))) {
        lastRead = thisRead
        notLegos.volumeQuickPort(convertToText(30 * (thisRead * relativeVolumeA)), notLegos.DigitalRJPin.J3)
        notLegos.volumeQuickPort(convertToText(30 * (thisRead * relativeVolumeB)), notLegos.DigitalRJPin.J4)
    }
})
