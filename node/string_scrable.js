// thank you, https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript


const ScrambleString = (String) => {
    let Letters = String.split(""),
        LettersLength = Letters.length

    for(let i = LettersLength - 1; i > 0; i--) {
        let Letter = Math.floor(Math.random() * (i + 1))
        let Temp = Letters[i]
        Letters[i] = Letters[Letter]
        Letters[Letter] = Temp
    }

    return Letters.join("")
}

// once again thank you, https://www.w3resource.com/javascript-exercises/javascript-string-exercise-27.php

const AsciiToHex = (String) => {
	let Array = []
	
    for (let n = 0, Length = String.length; n < Length; n ++) {
		let Hex = Number(String.charCodeAt(n)).toString(16)
		Array.push(Hex)
	}

	return Array.join('');
}

console.log(AsciiToHex(ScrambleString('')))
