const PostData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).catch(error => {return error})
	return response
}

const GetData = async (url = '') => {
	const response = await fetch(url).catch(error => {return error})
	return response
}

export { PostData, GetData }