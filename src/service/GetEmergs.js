export const GetEmergs = () => {
	return fetch(
		process.env.REACT_APP_URL_API + '/items/emerg?sort=-id&limit=10',
		{
			crossDomain: true,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-cache',
		}
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
