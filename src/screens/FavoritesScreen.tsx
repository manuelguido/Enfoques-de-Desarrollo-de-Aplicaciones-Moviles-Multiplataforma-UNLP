import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, FONT_SIZES } from "../utils/constants";

interface FavoritesScreenProps {
	navigation: any;
}

/**
 * Pantalla de favoritos
 */
export function FavoritesScreen({ navigation }: FavoritesScreenProps) {  
	const favorites = [];
	const isEmpty = favorites.length === 0;

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Mis Favoritos</Text>
				<Text style={styles.subtitle}>
					{favorites.length} {favorites.length === 1 ? "libro" : "libros"}
				</Text>
			</View>

			{isEmpty && (
				<View style={styles.footerInfo}>
					<Text style={styles.footerText}>Los libros que marques como favoritos aparecerán aquí</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		backgroundColor: COLORS.primary,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.surface,
	},
	subtitle: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.surface,
		opacity: 0.9,
		marginTop: SPACING.xs,
	},
	footerInfo: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		backgroundColor: COLORS.surface,
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
	},
	footerText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		textAlign: "center",
		fontStyle: "italic",
	},
});
