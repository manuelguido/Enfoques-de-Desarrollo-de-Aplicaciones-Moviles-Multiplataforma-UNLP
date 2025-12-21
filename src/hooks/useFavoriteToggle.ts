import { useCallback } from "react";
import { Alert } from "react-native";
import { Book } from "../models/Book";
import { useFavorites } from "../context/FavoritesContext";
import { MESSAGES } from "../utils/constants";

/**
 * Hook para manejar favoritos.
 */
export function useFavoriteToggle() {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	const toggleFavorite = useCallback(
		async (book: Book) => {
			const isCurrentlyFavorite = isFavorite(book.id);

			if (isCurrentlyFavorite) {
				Alert.alert("Eliminar de favoritos", `¿Estás seguro que deseas quitar "${book.title}" de tus favoritos?`, [
					{
						text: MESSAGES.CANCEL,
						style: "cancel",
					},
					{
						text: MESSAGES.DELETE,
						style: "destructive",
						onPress: async () => {
							try {
								await removeFavorite(book.id);
								Alert.alert("", MESSAGES.SUCCESS_REMOVED_FAVORITE);
							} catch (error) {
								Alert.alert("Error", MESSAGES.ERROR_GENERIC);
							}
						},
					},
				]);
			} else {
				try {
					await addFavorite(book);
					Alert.alert("", `"${book.title}" fue agregado a favoritos`);
				} catch (error) {
					Alert.alert("Error", "No se pudo agregar a favoritos");
				}
			}
		},
		[isFavorite, addFavorite, removeFavorite]
	);

	return {
		toggleFavorite,
		isFavorite,
	};
}
