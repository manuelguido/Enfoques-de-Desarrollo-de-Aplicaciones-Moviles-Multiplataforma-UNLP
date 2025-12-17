import axios, { AxiosInstance } from "axios";
import { Book, GoogleBooksResponse, convertGoogleBookToBook } from "../models/Book";
import ENV from "../config/env";

const GOOGLE_BOOKS_API_KEY = ENV.GOOGLE_BOOKS_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1";

interface SearchOptions {
	maxResults?: number; // Default: 10, Max: 40
	startIndex?: number; // Default: 0, para paginación
	orderBy?: "relevance" | "newest"; // Default: relevance
}

class GoogleBooksAPIService {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: BASE_URL,
			timeout: 10000,
		});
	}

	/**
	 * Buscar libros por query
	 */
	async searchBooks(query: string, options?: SearchOptions): Promise<Book[]> {
		try {
			if (!query || query.trim().length === 0) {
				throw new Error("El término de búsqueda no puede estar vacío");
			}

			const params = {
				q: query,
				key: GOOGLE_BOOKS_API_KEY,
				maxResults: options?.maxResults || 10,
				startIndex: options?.startIndex || 0,
				...(options?.orderBy && { orderBy: options.orderBy }),
			};

			const response = await this.client.get<GoogleBooksResponse>("/volumes", {
				params,
			});

			if (!response.data.items || response.data.items.length === 0) {
				return [];
			}

			return response.data.items.map((item) => convertGoogleBookToBook(item));
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	/**
	 * Obtener detalles (por volumeId)
	 */
	async getBookDetail(bookId: string): Promise<Book> {
		try {
			if (!bookId) {
				throw new Error("El ID del libro es requerido");
			}

			const params = {
				key: GOOGLE_BOOKS_API_KEY,
			};

			const response = await this.client.get(`/volumes/${bookId}`, { params });

			return convertGoogleBookToBook(response.data);
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	/**
	 * Buscar libros paginados
	 */
	async searchBooksWithPagination(query: string, page: number = 0, pageSize: number = 10): Promise<{ books: Book[]; totalItems: number }> {
		try {
			const startIndex = page * pageSize;

			const params = {
				q: query,
				key: GOOGLE_BOOKS_API_KEY,
				maxResults: pageSize,
				startIndex,
			};

			const response = await this.client.get<GoogleBooksResponse>("/volumes", {
				params,
			});

			const books = response.data.items ? response.data.items.map((item) => convertGoogleBookToBook(item)) : [];

			return {
				books,
				totalItems: response.data.totalItems || 0,
			};
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	isApiKeyConfigured(): boolean {
		return GOOGLE_BOOKS_API_KEY !== "YOUR_API_KEY_HERE" && GOOGLE_BOOKS_API_KEY.length > 0;
	}

	private handleError(error: any): void {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.error("Error API:", error.response.status, error.response.data);
			} else if (error.request) {
				console.error("Sin respuesta del servidor:", error.request);
			} else {
				console.error("Error en request:", error.message);
			}
		} else {
			console.error("Error desconocido:", error);
		}
	}
}

export const googleBooksAPI = new GoogleBooksAPIService();
