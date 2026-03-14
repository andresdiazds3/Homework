import { User } from "../classes/User";
import "../styles/stackCard.css";

type StackCardProps = {
	user: User;
};

function QueueCard({ user }: StackCardProps) {
	return (
		<article className="stack-card">
			<header className="stack-card__header">
				<h3 className="stack-card__title">{user.name}</h3>
			</header>

			<p className="stack-card__line">
				<strong>Monto a retirar:</strong> {user.amount}
			</p>
			<p className="stack-card__line">
				<strong>Hora de Llegada:</strong> {new Date(user.date).toLocaleString()}
			</p>
		</article>
	);
}

export default QueueCard;
