import { Share } from "react-native";
import { Book } from "../models/Book";

/**
 * Servicio para compartir libros
 */
interface ShareContent {
	title: string;
	message: string;
}

class ShareService {
	generateShareContent(book: Book): ShareContent {
		const authors = book.authors && book.authors.length > 0 ? `por ${book.authors.join(", ")}` : "";

		const year = book.publishedYear ? ` (${book.publishedYear})` : "";

		const message = `📚 "${book.title}"${authors}${year}\n\n`;
		const description = book.description ? `${book.description.substring(0, 200)}...\n\n` : "";
		const link = book.infoLink ? `Más info: ${book.infoLink}` : "";

		return {
			title: book.title,
			message: `${message}${description}${link}`,
		};
	}

	/**
	 * Compartir un libro
	 * Abre el menú nativo de compartir del dispositivo
	 */
	async shareBook(book: Book): Promise<boolean> {
		try {
			const { title, message } = this.generateShareContent(book);

			const result = await Share.share(
				{
					message: message,
					title: title,
				},
				{
					dialogTitle: `Compartir: ${title}`,
				},
			);

			return result.action === Share.sharedAction;
		} catch (error) {
			return false;
		}
	}
}

export const shareService = new ShareService();
