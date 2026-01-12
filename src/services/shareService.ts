import * as Sharing from "expo-sharing";
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
			if (!Sharing.isAvailableAsync) {
				console.warn("Compartir no está disponible en esta plataforma");
				return false;
			}

			const available = await Sharing.isAvailableAsync();
			if (!available) {
				console.error("No hay aplicaciones disponibles para compartir");
				return false;
			}

			const { title, message } = this.generateShareContent(book);

			await Sharing.shareAsync(message, {
				mimeType: "text/plain",
				dialogTitle: `Compartir: ${title}`,
			});

			return true;
		} catch (error) {
			if (error instanceof Error && error.message === "User did not share") {
				console.log("Usuario canceló la acción de compartir");
				return false;
			}
			console.error("Error compartiendo libro:", error);
			return false;
		}
	}
}

export const shareService = new ShareService();
