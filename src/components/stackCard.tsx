import { Book } from "../classes/Book";

type StackCardProps = {
	book: Book;
};

function StackCard({ book }: StackCardProps) {
	return (
		<article className="stack-card">
			<header className="stack-card__header">
				<h3>{book.name}</h3>
			</header>

			<p>
				<strong>ISBN:</strong> {book.ISBN}
			</p>
			<p>
				<strong>Autor:</strong> {book.autor}
			</p>
			<p>
				<strong>Editorial:</strong> {book.editorial}
			</p>
		</article>
	);
}

export default StackCard;
