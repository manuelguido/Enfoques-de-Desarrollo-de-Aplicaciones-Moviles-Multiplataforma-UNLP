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
				Alert.alert(MESSAGES.CONFIRM_REMOVE_FAVORITE, MESSAGES.CONFIRM_REMOVE_MESSAGE(book.title), [
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
					Alert.alert("", MESSAGES.SUCCESS_BOOK_ADDED(book.title));
				} catch (error) {
					Alert.alert("Error", MESSAGES.ERROR_ADD_FAVORITE);
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
