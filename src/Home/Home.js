import React, { useEffect, useRef, useState } from 'react';
import { GetUsers } from '../service/GetUsers';
import { PostEmerg } from '../service/PostEmerg';
import './Home.css';
import Emerg from './Emerg';
import { GetEmergs } from '../service/GetEmergs';

function upload(name, sens) {
	return PostEmerg(name, sens);
}

function Home() {
	let [users, setUsers] = useState([]);
	let [sumbit, setSubmit] = useState(false);
	let [sens, setSens] = useState('');
	let [name, setName] = useState('');
	let [emergs, setEmergs] = useState([]);
	const formRef = useRef();

	useEffect(() => {
		GetUsers().then((res) => {
			setUsers(res.data);
		});

		if (sumbit) {
			console.log(formRef.current);
			GetEmergs()
				.then((res) => {
					setEmergs(res.data);
					setSubmit(false);
					formRef.current.reset();
				})
				.catch((error) => console.error(error));
		}

		GetEmergs()
			.then((res) => {
				setEmergs(res.data);
			})
			.catch((error) => console.error(error));
	}, [sumbit]);

	const handleChangeUser = (e) => {
		setName(e.target.value);
	};

	const handleChangeSens = (e) => {
		setSens(e.target.value);
	};

	return (
		<div className="container">
			<div className="header">
				<h1>Bonjour ! </h1>

				<form ref={formRef}>
					<select
						name="users"
						id="users"
						onChange={handleChangeUser}
						defaultValue={'DEFAULT'}
					>
						<option value="DEFAULT" disabled hidden>
							Sélectionne ton nom
						</option>
						{users.map((user) => {
							return (
								<option
									key={user.id}
									value={user.first_name + ' ' + user.last_name}
								>
									{user.first_name + ' ' + user.last_name}
								</option>
							);
						})}
					</select>

					<select
						name="sens"
						id="sens"
						onChange={handleChangeSens}
						defaultValue={'DEFAULT'}
					>
						<option value="DEFAULT" disabled hidden>
							Sélectionne le sens
						</option>
						<option value="Arrivée">Arrivée</option>
						<option value="Départ">Départ</option>
					</select>

					<input
						type="submit"
						value="Envoyer"
						className="sumbit"
						onClick={(event) => {
							event.preventDefault();
							if (name === '' || sens === '') {
								alert('Veuillez remplir tous les champs');
							} else {
								if (name !== 'Default' && sens !== 'DEFAULT') {
									upload(name, sens)
										.then(setSubmit(true))
										.catch((error) => {
											console.error(error);
											alert(
												"Une erreur s'est produite, API est indisponible, veuillez prendre contact avec votre supérieur"
											);
										});
								}
							}
						}}
					/>
				</form>
			</div>
			<div className="sens">
				<Emerg filter="Arrivée" emergs={emergs} />
				<Emerg filter="Départ" emergs={emergs} />
			</div>
		</div>
	);
}

export default Home;
