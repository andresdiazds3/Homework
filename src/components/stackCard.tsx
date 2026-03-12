import { Book } from "../classes/Book";
import "../styles/stackCard.css";

type StackCardProps = {
	book: Book;
};

function StackCard({ book }: StackCardProps) {
	return (
		<article className="stack-card">
			<header className="stack-card__header">
				<h3 className="stack-card__title">{book.name}</h3>
			</header>

			<p className="stack-card__line">
				<strong>ISBN:</strong> {book.ISBN}
			</p>
			<p className="stack-card__line">
				<strong>Autor:</strong> {book.autor}
			</p>
			<p className="stack-card__line">
				<strong>Editorial:</strong> {book.editorial}
			</p>
		</article>
	);
}

export default StackCard;
