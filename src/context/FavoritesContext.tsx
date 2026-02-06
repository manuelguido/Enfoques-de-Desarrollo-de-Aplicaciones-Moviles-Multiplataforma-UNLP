import React, { createContext, useReducer, useCallback, useEffect, ReactNode } from "react";
import { Favorite, FavoritesState, FavoritesAction } from "../models/Favorite";
import { Book } from "../models/Book";
import { createFavorite, updateFavoriteRating } from "../models/Favorite";
import { storageService } from "../services/storageService";
import { MESSAGES } from "../utils/constants";

/**
 * Context para el estado global de favoritos
 */
export interface FavoritesContextType {
	state: FavoritesState;
	addFavorite: (book: Book) => Promise<void>;
	removeFavorite: (bookId: string) => Promise<void>;
	updateRating: (bookId: string, rating: number) => Promise<void>;
	isFavorite: (bookId: string) => boolean;
	getFavorite: (bookId: string) => Favorite | undefined;
	loadFavorites: () => Promise<void>;
}

const initialState: FavoritesState = {
	favorites: [],
	loading: true,
	error: null,
};

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
	switch (action.type) {
		case "LOAD_FAVORITES":
			return {
				...state,
				favorites: action.payload,
				loading: false,
				error: null,
			};

		case "ADD_FAVORITE": {
			const exists = state.favorites.some((f) => f.id === action.payload.id);
			if (exists) return state;
			return {
				...state,
				favorites: [...state.favorites, action.payload],
				error: null,
			};
		}

		case "REMOVE_FAVORITE":
			return {
				...state,
				favorites: state.favorites.filter((f) => f.id !== action.payload),
				error: null,
			};

		case "UPDATE_RATING": {
			const { bookId, rating } = action.payload;
			return {
				...state,
				favorites: state.favorites.map((f) => (f.id === bookId ? updateFavoriteRating(f, rating) : f)),
				error: null,
			};
		}

		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Provider del contexto de favoritos
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(favoritesReducer, initialState);

	const loadFavorites = useCallback(async () => {
		try {
			const favorites = await storageService.getFavorites();
			dispatch({ type: "LOAD_FAVORITES", payload: favorites });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : MESSAGES.ERROR_UNKNOWN;
			dispatch({ type: "SET_ERROR", payload: errorMessage });
		}
	}, []);

	const addFavorite = useCallback(async (book: Book) => {
		try {
			const favorite = createFavorite(book, 0);
			await storageService.saveFavorite(favorite);
			dispatch({ type: "ADD_FAVORITE", payload: favorite });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : MESSAGES.ERROR_ADD_FAVORITES_CONTEXT;
			dispatch({ type: "SET_ERROR", payload: errorMessage });
			throw error;
		}
	}, []);

	const removeFavorite = useCallback(async (bookId: string) => {
		try {
			await storageService.removeFavorite(bookId);
			dispatch({ type: "REMOVE_FAVORITE", payload: bookId });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : MESSAGES.ERROR_REMOVE_FAVORITES_CONTEXT;
			dispatch({ type: "SET_ERROR", payload: errorMessage });
			throw error;
		}
	}, []);

	const updateRating = useCallback(async (bookId: string, rating: number) => {
		try {
			await storageService.updateFavoriteRating(bookId, rating);
			dispatch({ type: "UPDATE_RATING", payload: { bookId, rating } });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : MESSAGES.ERROR_UPDATE_RATING_CONTEXT;
			dispatch({ type: "SET_ERROR", payload: errorMessage });
			throw error;
		}
	}, []);

	const isFavorite = useCallback(
		(bookId: string): boolean => {
			return state.favorites.some((f) => f.id === bookId);
		},
		[state.favorites]
	);

	const getFavorite = useCallback(
		(bookId: string): Favorite | undefined => {
			return state.favorites.find((f) => f.id === bookId);
		},
		[state.favorites]
	);

	useEffect(() => {
		loadFavorites();
	}, [loadFavorites]);

	const value: FavoritesContextType = {
		state,
		addFavorite,
		removeFavorite,
		updateRating,
		isFavorite,
		getFavorite,
		loadFavorites,
	};

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

/**
 * Hook para usar el contexto de favoritos
 */
export function useFavorites(): FavoritesContextType {
	const context = React.useContext(FavoritesContext);

	if (!context) {
		throw new Error(MESSAGES.ERROR_CONTEXT_OUTSIDE_PROVIDER);
	}

	return context;
}
