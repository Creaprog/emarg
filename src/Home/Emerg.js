import { useEffect, useState } from 'react';
import './Emerg.css';

export default function Emerg(props) {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUsers(props.emergs.filter((user) => user.sens === props.filter));
	}, [props]);
	return (
		<div className="emerg">
			<h1>{props.filter}</h1>
			{users.map((user) => {
				return (
					<ul key={user.id} className="user">
						<li>{user.name}</li>
						<li>{user.date}</li>
						<li>{user.heure}</li>
						{user.retard ? (
							<li
								style={{
									color: 'red',
								}}
							>
								En retard de {user.retard} minutes
							</li>
						) : null}
					</ul>
				);
			})}
		</div>
	);
}
