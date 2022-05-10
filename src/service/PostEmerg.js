export const PostEmerg = (name, sens) => {
	const week = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
		'Dimanche',
	];
	const month = [
		'janvier',
		'février',
		'mars',
		'avril',
		'mai',
		'juin',
		'juillet',
		'août',
		'septembre',
		'octobre',
		'novembre',
		'décembre',
	];
	const date = new Date();
	let retard;
	if (sens === 'Arrivée' && date.getMinutes() > 5 && date.getMinutes() < 40) {
		retard = date.getMinutes();
	}
	return fetch(process.env.REACT_APP_URL_API + '/items/emerg', {
		crossDomain: true,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			sens: sens,
			date:
				week[date.getDay()] +
				' ' +
				date.getDate() +
				' ' +
				month[date.getMonth()] +
				' ' +
				date.getFullYear(),
			heure:
				date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
			retard: retard,
		}),
	}).catch((error) => console.error(error));
};
