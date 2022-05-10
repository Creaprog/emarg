export const GetUsers = () => {
	return fetch(process.env.REACT_APP_URL_API + '/users?sort=first_name', {
		crossDomain: true,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
