import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite } from "../models/Favorite";

/**
 * Servicio para manejar almacenamiento local usando AsyncStorage
 * Persiste los favoritos y sus puntajes en el dispositivo
 */

const STORAGE_KEYS = {
	FAVORITES: "@books_app/favorites",
};

class StorageService {
	async saveFavorite(favorite: Favorite): Promise<void> {
		try {
			const favorites = await this.getFavorites();

			const index = favorites.findIndex((f) => f.id === favorite.id);
			if (index >= 0) {
				favorites[index] = favorite;
			} else {
				favorites.push(favorite);
			}

			await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
		} catch (error) {
			console.error("Error guardando favorito:", error);
			throw error;
		}
	}

	async getFavorites(): Promise<Favorite[]> {
		try {
			const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error obteniendo favoritos:", error);
			return [];
		}
	}

	async getFavorite(bookId: string): Promise<Favorite | null> {
		try {
			const favorites = await this.getFavorites();
			return favorites.find((f) => f.id === bookId) || null;
		} catch (error) {
			console.error("Error obteniendo favorito:", error);
			return null;
		}
	}

	async removeFavorite(bookId: string): Promise<void> {
		try {
			const favorites = await this.getFavorites();
			const filtered = favorites.filter((f) => f.id !== bookId);

			await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
		} catch (error) {
			console.error("Error eliminando favorito:", error);
			throw error;
		}
	}

	async isFavorite(bookId: string): Promise<boolean> {
		try {
			const favorite = await this.getFavorite(bookId);
			return favorite !== null;
		} catch (error) {
			console.error("Error verificando favorito:", error);
			return false;
		}
	}

	async updateFavoriteRating(bookId: string, rating: number): Promise<Favorite | null> {
		try {
			const favorite = await this.getFavorite(bookId);

			if (!favorite) {
				console.error("Favorito no encontrado:", bookId);
				return null;
			}

			const updated: Favorite = {
				...favorite,
				rating: Math.max(0, Math.min(5, rating)),
				updatedDate: Date.now(),
			};

			await this.saveFavorite(updated);
			return updated;
		} catch (error) {
			console.error("Error actualizando rating:", error);
			throw error;
		}
	}

	async clearFavorites(): Promise<void> {
		try {
			await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITES);
		} catch (error) {
			console.error("Error limpiando favoritos:", error);
			throw error;
		}
	}

	async getFavoritesCount(): Promise<number> {
		try {
			const favorites = await this.getFavorites();
			return favorites.length;
		} catch (error) {
			console.error("Error contando favoritos:", error);
			return 0;
		}
	}
}

export const storageService = new StorageService();
