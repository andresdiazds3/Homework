import { User } from "../classes/User";
import "../styles/QueueCard.css";

type QueueCardProps = {
	user: User;
};

function QueueCard({ user }: QueueCardProps) {
	return (
		<article className="queue-card">
			<header className="queue-card__header">
				<h3 className="queue-card__title">{user.name}</h3>
			</header>

			<p className="queue-card__line">
				<strong>Monto a retirar:</strong> {user.amount}
			</p>
			<p className="queue-card__line">
				<strong>Hora de Llegada:</strong> {new Date(user.date).toLocaleString()}
			</p>
		</article>
	);
}

export default QueueCard;