import { GetData, PostData } from './http'

class Cardinal {
	constructor(CardinalURL = "USE_LIST") {
		this.ConnectionURL = CardinalURL
		this.CardinalIdentifier = undefined

		// NOT_CONNECTED, LOST_CONNECTION, CONNECTED, EXPIRED, USE_FALLBACK
		this.State = 'NOT_CONNECTED'

		this.CardinalInstances = [
			{
				Name: 'Cardinal',
				Addresses: ['https://cardinal.zdig.xyz'], // first element is the main one, every other one is treated as a fallback url for that instance (may not be implemented yet)
				Type: 'CROTR'
			},
			{
				Name: 'Asuna',
				Addresses: ['https://asuna.cardinal.zdig.xyz'],
				Type: 'DREF'
			},
			{
				Name: 'Kirito',
				Addresses: ['https://kirito.cardinal.zdig.xyz'],
				Type: 'DREF'
			},
			{
				Name: 'Lisbeth',
				Addresses: ['https://lisbeth.cardinal.zdig.xyz'],
				Type: 'DREF'
			},
			{
				Name: 'Klein',
				Addresses: ['https://klein.cardinal.zdig.xyz'],
				Type: 'DREF'
			}
		]


	}

	async Handshake(CardinalURL, Force = false) {
		let _this = this
		
		return new Promise(async (Resolve, Reject) => {
			if (_this.CardinalIdentifier != undefined && !Force) return Reject('Attepting to re-establish a cardinal connection')

			let CardinalResponse = await GetData(CardinalURL)

			// if the request fails or cardinal doesn't return a successful response (the 2nd one should never happen!)
			if (!CardinalResponse.ok || CardinalResponse.json().statuses[0].code !== -200) return Reject('Unable to establish a connection with the Cardinal Instance ('+ CardinalURL +')')

			const Data = CardinalResponse.json()

			let CardinalHandshakeResponse = await PostData(Data.sendTo + '/handshake', { token: Data.handshakeToken, origin: CardinalURL, identifier: 'service/landingpage' })
			if (Data.sendTo !== CardinalURL) _this.CardinalURL = Data.sendTo

			if (!CardinalHandshakeResponse.ok || CardinalResponse.json().statuses[0].code !== -200) return Reject('Cardinal handshake failed (Cardinal Instance at '+ Data.sendTo +')')

			let HandshakeResponse = CardinalHandshakeResponse.json()

			_this.CardinalIdentifier = HandshakeResponse.connectionIdentifier
			return Resolve(HandshakeResponse)
		})
	}

	async AttemptConnections() {
		if (this.ConnectionURL === "USE_LIST") {
			for (const CardinalInstance of this.CardinalInstances) {
				console.log('Cardinal connection script is attempting to establish a connection with \''+ CardinalInstance.Addresses[0] +'\'')
				
				try {
					Handshake = await this.Handshake(CardinalInstance.Addresses[0])
					this.CardinalIdentifier = Handshake.connectionIdentifier
					break
				} catch (Error) {
					console.error(Error)
					continue
				}
			}


		}
	}
}

class Ordinal {
	constructor(OrdinalURL = "USE_LIST") {
		this.ConnectionURL = OrdinalURL
		this.OrdinalIdentifier = undefined

		// NOT_CONNECTED, LOST_CONNECTION, CONNECTED, EXPIRED, USE_FALLBACK
		this.State = 'NOT_CONNECTED'

		this.OrdinalInstances = [
			{
				Name: 'Auna',
				Addresses: ['https://auna.ordinal.zdig.xyz'], // first element is the main one, every other one is treated as a fallback url for that instance (may not be implemented yet)
				Type: 'DREF'
			},
			{
				Name: 'Kito',
				Addresses: ['https://kito.ordinal.zdig.xyz'],
				Type: 'DREF'
			}
		]


	}

	async Handshake(OrdinalURL, Force = false) {
		let _this = this
		
		return new Promise(async (Resolve, Reject) => {
			if (_this.OrdinalIdentifier != undefined && !Force) return Reject('Attepting to re-establish an Ordinal connection')

			let OrdinalResponse = await GetData(OrdinalURL)

			// if the request fails or cardinal doesn't return a successful response (the 2nd one should never happen!)
			if (!OrdinalResponse.ok || OrdinalResponse.json().statuses[0].code !== -200) return Reject('Unable to establish a connection with the Cardinal Instance ('+ CardinalURL +')')

			const Data = OrdinalResponse.json()

			let OrdinalHandshakeResponse = await PostData(Data.sendTo + '/handshake', { token: Data.handshakeToken, origin: CardinalURL, identifier: 'service/landingpage' })
			if (Data.sendTo !== OrdinalURL) _this.OrdinalURL = Data.sendTo

			if (!OrdinalHandshakeResponse.ok || OrdinalResponse.json().statuses[0].code !== -200) return Reject('Cardinal handshake failed (Cardinal Instance at '+ Data.sendTo +')')

			let HandshakeResponse = OrdinalHandshakeResponse.json()

			_this.OrdinalIdentifier = HandshakeResponse.connectionIdentifier
			return Resolve(HandshakeResponse)
		})
	}

	async AttemptConnections() {
		if (this.ConnectionURL === "USE_LIST") {
			for (const OrdinalInstance of this.OrdinalInstances) {
				console.log('Ordinal connection script is attempting to establish a connection with \''+ OrdinalInstance.Addresses[0] +'\'')
				
				try {
					Handshake = await this.Handshake(OrdinalInstance.Addresses[0])
					this.OrdinalIdentifier = Handshake.connectionIdentifier
					break
				} catch (Error) {
					console.error(Error)
					continue
				}
			}

			
		}
	}
}