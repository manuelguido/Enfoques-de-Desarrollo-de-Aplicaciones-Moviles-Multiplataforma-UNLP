import { Book } from "./Book";

/**
 * Modelo para un libro marcado como favorito
 */
export interface Favorite extends Book {
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
	type: "ADD_FAVORITE" | "REMOVE_FAVORITE" | "LOAD_FAVORITES" | "SET_ERROR";
	payload?: any;
}

/**
 * Crear un Favorite a partir de un Book
 */
export function createFavorite(book: Book): Favorite {
	return {
		...book,
		addedDate: Date.now(),
		updatedDate: Date.now(),
	};
}
