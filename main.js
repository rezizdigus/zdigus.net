import './style.css'

import { GetData, PostData } from './http'

// Navbar and footer thingie

const Navbar = document.getElementById('navbar')
const Footer = document.getElementById('footer')

Navbar.onmousemove = (e) => {
	const Rect = Navbar.getBoundingClientRect(),
		x = e.clientX - Rect.left,
		y = e.clientY - Rect.top;

	Navbar.style.setProperty('--mouse-x', `${x}px`)
	Navbar.style.setProperty('--mouse-y', `${y}px`)
}

Footer.onmousemove = (e) => {
	const Rect = Footer.getBoundingClientRect(),
		x = e.clientX - Rect.left,
		y = e.clientY - Rect.top;

	Footer.style.setProperty('--mouse-x', `${x}px`)
	Footer.style.setProperty('--mouse-y', `${y}px`)
}

// subtitle text

let AbsolutelyHilariousThings = [
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
	"<a href=\"https://tewwyiscool160.xyz\">amazing website</a>",
	"<span class=\"link\" onclick=\"location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'\">video of a cute cat</spanhref=>",
	"i rickrolled terry",
	"what the fuck is a quaternion",
	"code was just made to break.",
	"/hlep (take that discord)",
	"FRIENDS!!!!",
	"t****",
	"*e***",
	"**r**",
	"***r*",
	"****y",
	"easter eggs exist",
	"<a href=\"https://dev.genshin.click\">the most complex clicker ever (soon)</a>",
	"why do homework when you can do nothing",
	"wear the crown.",
	"just wait till i start a youtube channel",
	"having whole loooads of fun...",
	"loading lmao.",
	"im a crazy guy sometimes",
	"fuck me.",
	"have fun",
	"Technoblade never dies",
	"the cactus guy",
	"not a watermelon",
	"i suck at skywars.",
	"gotta get good now.",
	"stuff i say here is (mostly) real",
	"cringe.",
	"hilarious.",
	"get the primos",
	"xiao best character, chane my mind.",
	"teyvat hates me",
	"fuck genshin haters lmao.",
	"sArCaSm",
	"random thing",
	"playin' fnaf",
	"spotify.",
	"codin' stuff",
	"i'm good at copying things, not necessarily doing things.",
	"i actually like Sword Art Online, unbelieveable right?",
	"why did you kill Yuuki",
	"Kirito best swordsman",
	"A- su- na",
	"your waifu is hooome",
	"hoyoverse.",
	"a self-proclaimed good developer, who likes to never code, be lazy and doesn't do his homework.",
	"meow",
	"meowing at code",
	"slamming my keyboard",
	"lovely.",
	"I am Yuzaki Nasa and I'll reach the speed to light faster than NASA",
	"look me up on my anime list.",
	"i both watch and don't watch a lot of anime.",
	"656f616173696e6d6e47"
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
					ChangeSubtitle({ disableinterval: true, text: 'do it again, i dare you.' })
					this.eedata.stage++
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
	if (e.key == 'Backspace') {word = ''; return}

	word += e.key
	if (KBEasterEggs[word] != null || KBEasterEggs[word] != undefined) {
		KBEasterEggs[word].run()
		word = ''
	}
	if (word.length > 10) word = ''
}

// notification stuff

const NotificationWrapper = document.getElementById('notification-wrapper')
const NotificationMessage = document.getElementById('notification-message')
const NotificationClose = document.getElementById('notification-close')

const OpenNotification = async () => {
	return NotificationWrapper.classList.remove('get-out')
}

const CloseNotification = async () => {
	NotificationWrapper.classList.remove('critical')
	NotificationWrapper.classList.add('get-out')

	NotifyID = undefined

	// to prevent the notification from opening too quickly
	return new Promise(resolve => setTimeout(resolve, 1000));
}

const ShowNotification = async ({ Message, Critical = false }) => {
	await CloseNotification()

	if (Critical) NotificationWrapper.classList.add('critical')
	NotificationMessage.innerHTML = Message
	await OpenNotification()
	return;
}

NotificationClose.onclick = async () => {
	CloseNotification()
}

let NotifyID = undefined // 1 - cardinal connection error, 2 - status page error, anything else - custom notification
let CardinalIdentifier = undefined

const GetNotification = async () => {
	let CardinalURL = 'https://cardinal.zdig.xyz/'

	// attempt a cardinal handshake

	let CardinalResponse = await GetData('https://cardinal.zdig.xyz/')

	if (!CardinalResponse.ok) {
		CardinalResponse = await GetData('https://cardinal.asuna.zdig.xyz/')
		CardinalURL = 'https://cardinal.asuna.zdig.xyz/'
	}

	if (!CardinalResponse.ok) {
		CardinalResponse = await GetData('https://cardinal.kirito.zdig.xyz/')
		CardinalURL = 'https://cardinal.kirito.zdig.xyz/'
	}
	
	if (!CardinalResponse.ok) {
		CardinalResponse = await GetData('https://cardinal.lisbeth.zdig.xyz/')
		CardinalURL = 'https://cardinal.lisbeth.zdig.xyz/'
	}
	
	if (!CardinalResponse.ok) {		
		if (NotifyID == 1) return
		
		NotifyID = 1

		ShowNotification({ Message: 'Cannot establish a connection with any of the known Cardinal instances. Check the&nbsp;<a href="https://status.zdigus.net">status page</a>.', Critical: true })
		return
	}

	const Data = CardinalResponse.json()

	let CardinalHandshakeResponse = await PostData(Data.sendTo + 'handshake', { token: Data.handshakeToken, origin: CardinalURL, identifier: 'service/landingpage' })
	if (Data.sendTo !== CardinalURL) CardinalURL = Data.sendTo

	if (!CardinalHandshakeResponse.ok) {
		ShowNotification({ Message: 'Cardinal Handshake failed. Check the&nbsp;<a href="https://status.zdigus.net">status page</a>.', Critical: true })
		return
	}

	let HandshakeResponse = CardinalHandshakeResponse.json()

	CardinalIdentifier = HandshakeResponse.connectionIdentifier

	// try to get status page incidents

	let StatusPageResponse = await PostData(CardinalURL + 'system_command', { identifier: CardinalIdentifier, command: 'GET ACTIVE_STATUSPAGE_INCIDENTS' })

	if (!StatusPageData.ok) {
		console.log('Failed to get status page data')
	}

	const StatusPageData = StatusPageResponse.json

	if (StatusPageData.success == true && StatusPageData.result.allFine == false) {
		ShowNotification({ Message: 'There is an ongoing incident. Check the&nbsp;<a href="https://status.zdigus.net">status page</a>.', Critical: true })
		return
	}

	// try to get the latest notification
	let NotificationResponse = await PostData(CardinalURL + 'system_command', { identifier: CardinalIdentifier, command: 'GET LATEST_LANDINGPAGE_NOTIFICATION' })

	if (!StatusPageData.ok) {
		console.log('Failed to get notification data')
	}

	const NotificationData = NotificationResponse.json

	if (NotificationData.success == true && NotificationData.result.ShowNotification == true) {
		ShowNotification({ Message: NotificationData.result.notificationContent, Critical: NotificationData.result.notificationIsCritical })
	} else {
		CloseNotification()
	}
}

// cardinal is not finished yet, nor is ordnial, or any replacement temporary api, therefore these are temporairly commented out.
// TODO: actually finish cardinal lmao.

// ! にゃ。

// GetNotification()

// setInterval(async () => {
// 	GetNotification()
// }, 100000);

const Today = new Date()
if (Today.getMonth() == 3 && Today.getDate() == 1) {
	const root = document.querySelector(':root')

	root.style.setProperty('--dark-bg', `rgb(${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1})`)
	root.style.setProperty('--dark-bg-accent', `rgb(${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1})`)
	root.style.setProperty('--dark-color', `rgb(${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1})`)
	root.style.setProperty('--dark-color-blue', `rgb(${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1}, ${Math.round(Math.random() * 256) - 1})`)

	if (Math.round(Math.random() * 100) < 98) {
		const el = document.createElement('a')
		el.innerHTML = 'click me!!111!!1!!'
		el.style.zIndex = '99'
		el.style.position = 'absolute'
		el.style.top = '20%'
		el.style.left = '40%'
		el.style.color = 'blue'
		el.style.fontSize = '10rem'
		el.id = 'clickkkkk'

		document.body.appendChild(el)

		el.onclick = async () => {
			const el = document.createElement('div')
			el.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			el.style.position = 'absolute'
			el.zIndex = '9999'
			el.style.width = (Math.random() * 6.5) + 'rem'
			el.style.height = (Math.random() * 6.5) + 'rem'
			el.style.top = (Math.random() * 85 + 5) + 'vh'
			el.style.left = (Math.random() * 85 + 5) + 'vw'
			el.id = 'hehehehehe'
			
			document.body.appendChild(el)

			setInterval(async () => {
				const hehehe = document.getElementById('hehehehehe')

				el.style.top = (Math.random() * 85 + 5) + 'vh'
				el.style.left = (Math.random() * 85 + 5) + 'vw'
				el.style.transform = 'rotate(' + (Math.random() * 359) + 'deg)'
			}, 420)
		}
	}

	AbsolutelyHilariousThings = ['I wonder what day it is', 'who the hell designed this color scheme', 'the author of this website is the smartest person on earth', 'league of legends best game', 'genshin impact is the worst game ever', 'cat suck', 'sword art online is the worst anime']
	ChangeSubtitle({ random: true })
}


