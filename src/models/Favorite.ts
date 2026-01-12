import { Book } from "./Book";

/**
 * Modelo para un libro marcado como favorito
 */
export interface Favorite extends Book {
	rating: number;
	addedDate: number;
	updatedDate: number;
}

/**
 * Interfaz para el estado de los favoritos
 */
export interface FavoritesState {
	favorites: Favorite[];
	loading: boolean;
	error: string | null;
}

/**
 * Interfaz para las acciones del reducer de favoritos
 */
export interface FavoritesAction {
	type: "ADD_FAVORITE" | "REMOVE_FAVORITE" | "UPDATE_RATING" | "LOAD_FAVORITES" | "SET_ERROR";
	payload?: any;
}

/**
 * Crear un Favorite a partir de un Book
 */
export function createFavorite(book: Book, rating: number = 0): Favorite {
	return {
		...book,
		rating,
		addedDate: Date.now(),
		updatedDate: Date.now(),
	};
}

/**
 * Actualizar el rating de un Favorite
 */
export function updateFavoriteRating(favorite: Favorite, newRating: number): Favorite {
	return {
		...favorite,
		rating: Math.max(0, Math.min(5, newRating)),
		updatedDate: Date.now(),
	};
}
