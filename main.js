import './style.css'

import * as Turbo from "@hotwired/turbo"

// Navbar thingie

const Navbar = document.getElementById('navbar')

Navbar.onmousemove = (e) => {
	const Rect = Navbar.getBoundingClientRect(),
		x = e.clientX - Rect.left,
		y = e.clientY - Rect.top;

	Navbar.style.setProperty('--mouse-x', `${x}px`)
	Navbar.style.setProperty('--mouse-y', `${y}px`)
}

// subtitle text

const AbsolutelyHilariousThings = [
	"my code broke again",
	"rezisstupid™",
	"rezissmart™",
	"extremely professional developer",
	"why shit never work",
	"AAAAAAAAAAAAAAAAAAAAAA",
	"5 quintillions of cobblestone",
	"reactor does boom",
	"google likes your data",
	"comedy mastermind.",
	"atomic go to hell",
	"*rez's awesome webshit",
	"do not look at my github",
	"<a href=\"https://tewwyiscool160.xyz/\">amazing website</a>",
	"<span class=\"link\" onclick=\"location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'\">video of a cute cat</spanhref=>"
]

const Subtitle = document.getElementById('subtitle')

let SubtitleInterval = false;

const ChangeSubtitle = ({ random, text = undefined, disableinterval = false }) => {
	if (random == true) {
		Subtitle.innerHTML = `"${AbsolutelyHilariousThings[Math.floor(Math.random() * AbsolutelyHilariousThings.length)]}"`
		if (!SubtitleInterval) SubtitleInterval = setInterval(() => ChangeSubtitle({ random: true }), 60000)
	} else {
		if (text) {
			if (disableinterval) {clearInterval(SubtitleInterval); SubtitleInterval = false}
			Subtitle.innerHTML = `"${text}"`
		} else {
			return false;
		}
	}
}

ChangeSubtitle({ random: true })

// keyboard easter egg
let word = '';

const KBEasterEggs = {
	"terry": {
		eedata: {
			stage: 0
		},
		run: function () {
			const Title = document.getElementById('title')
			const SubTitle = document.getElementById('subtitle')

			switch (this.eedata.stage) {
				case 0:
					Title.innerHTML = `no.`
					SubTitle.innerHTML = `"do it again, i dare you."`
					this.eedata.stage++
					console.log(this.eedata)
					return
				case 1:
					Title.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					SubTitle.innerHTML = `"you got what you asked for."`
					SubTitle.style.display = 'none'
					return
				default:
					throw new Error('Unknown easter egg stage')
			}
		}
	}
}

document.onkeyup = (e) => {
	word += e.key
	console.log(word)
	if (KBEasterEggs[word] != null || KBEasterEggs[word] != undefined) {
		console.log('found easter egg')
		KBEasterEggs[word].run()
		word = ''
	}
	if (word.length > 10) word = ''
}
