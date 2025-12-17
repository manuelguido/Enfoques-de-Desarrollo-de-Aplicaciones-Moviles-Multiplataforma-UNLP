/**
 * Helpers generales para abstraer lógica de los libros
 */
import { Book } from "../models/Book";

/**
 * Formatear un Array de autores a string
 */
export function formatAuthors(authors?: string[]): string {
	if (!authors || authors.length === 0) {
		return "Autor desconocido";
	}
	return authors.join(", ");
}

/**
 * Obtener el primer autor
 */
export function getFirstAuthor(authors?: string[]): string {
	if (!authors || authors.length === 0) {
		return "Autor desconocido";
	}
	return authors[0];
}

/**
 * Formatear año de publicación
 */
export function formatPublishedYear(year?: number | string): string {
	if (!year) {
		return "Año desconocido";
	}
	return String(year);
}

/**
 * Truncar descripción a longitud máxima
 */
export function truncateText(text?: string, maxLength: number = 200): string {
	if (!text) {
		return "";
	}
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + "...";
}

/**
 * Obtener URL de imagen
 */
export function getImageUrl(book: Book, size: "small" | "large" = "small"): string | null {
	if (size === "large") {
		return book.imageLinks?.thumbnail || book.thumbnail || null;
	}
	return book.imageLinks?.smallThumbnail || book.thumbnail || null;
}

/**
 * Formatear número de páginas
 */
export function formatPageCount(pages?: number): string {
	if (!pages) return "Páginas desconocidas";
	return `${pages} página${pages !== 1 ? "s" : ""}`;
}

/**
 * Obtener código de idioma legible
 */
export function formatLanguage(language?: string): string {
	const languages: { [key: string]: string } = {
		en: "Inglés",
		es: "Español",
		fr: "Francés",
		de: "Alemán",
		it: "Italiano",
		pt: "Portugués",
		ja: "Japonés",
		zh: "Chino",
		ko: "Coreano",
		ru: "Ruso",
	};

	if (!language) return "Idioma desconocido";
	return languages[language.toLowerCase()] || language;
}

/**
 * Generar resumen de libro para lista
 */
export function generateBookSummary(book: Book): string {
	const title = book.title;
	const author = getFirstAuthor(book.authors);
	const year = book.publishedYear ? ` (${book.publishedYear})` : "";

	return `${title} - ${author}${year}`;
}
