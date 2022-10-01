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

Subtitle.innerHTML = `"${AbsolutelyHilariousThings[Math.floor(Math.random() * AbsolutelyHilariousThings.length)]}"`
