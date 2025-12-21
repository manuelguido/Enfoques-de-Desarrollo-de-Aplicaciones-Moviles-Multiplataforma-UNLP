import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../context/FavoritesContext";
import { BookCard } from "../components/BookCard";
import { Favorite } from "../models/Favorite";
import { COLORS, SPACING, FONT_SIZES, MESSAGES } from "../utils/constants";

interface FavoritesScreenProps {
	navigation: any;
}

/**
 * Pantalla para mostrar los libros marcados como favoritos
 */
export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
	const { state: favoritesState } = useFavorites();

	/**
	 * Navegar al detalle del libro
	 */
	const handleBookPress = useCallback(
		(favorite: Favorite) => {
			navigation.navigate("BookDetailFromFavorites", { book: favorite });
		},
		[navigation]
	);

	/**
	 * Renderizar favorito
	 */
	const renderFavoriteItem = useCallback(({ item }: { item: Favorite }) => <BookCard book={item} onPress={() => handleBookPress(item)} />, [handleBookPress]);

	const favorites = favoritesState.favorites || [];
	const isEmpty = favorites.length === 0;

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Mis Favoritos</Text>
				<Text style={styles.subtitle}>
					Tienes {favorites.length} {favorites.length === 1 ? "libro" : "libros"} en favoritos.
				</Text>
			</View>

			{/* Lista de favoritos */}
			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id}
				renderItem={renderFavoriteItem}
				contentContainerStyle={[styles.listContent, isEmpty && styles.listContentEmpty]}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						{!isEmpty && <Text style={styles.emptyIcon}>Libros</Text>}
						<Text style={styles.emptyMessage}>{MESSAGES.NO_FAVORITES}</Text>
						<Text style={styles.emptySubtext}>Los libros que marques como favorito aparecerán aquí</Text>
					</View>
				}
			/>

			{/* Info si está vacío */}
			{isEmpty && (
				<View style={styles.footerInfo}>
					<Text style={styles.footerText}>Ve al inicio para buscar libros y agregar a tus favoritos.</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	header: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		backgroundColor: "#ffffff",
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.text900,
	},
	subtitle: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text900,
		opacity: 0.9,
		marginTop: SPACING.xs,
	},
	listContent: {
		padding: SPACING.md,
		gap: SPACING.md,
	},
	listContentEmpty: {
		flex: 1,
		justifyContent: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: SPACING["2xl"],
	},
	emptyIcon: {
		fontSize: FONT_SIZES["3xl"],
		marginBottom: SPACING.md,
	},
	emptyMessage: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		color: COLORS.text950,
		marginBottom: SPACING.sm,
		textAlign: "center",
	},
	emptySubtext: {
		fontSize: FONT_SIZES.base,
		color: COLORS.text700,
		textAlign: "center",
		paddingHorizontal: SPACING.md,
	},
	footerInfo: {
		marginTop: "auto",
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		backgroundColor: COLORS.surface,
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
	},
	footerText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text700,
		textAlign: "center",
		fontStyle: "italic",
	},
});
