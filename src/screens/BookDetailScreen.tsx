import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../models/Book";
import { StarRating } from "../components/StarRating";
import { useFavorites } from "../context/FavoritesContext";
import { shareService } from "../services/shareService";
import { connectivityService } from "../services/connectivityService";
import { COLORS, SPACING, FONT_SIZES, MESSAGES, BORDER_RADIUS, SHADOWS } from "../utils/constants";
import { formatAuthors, formatLanguage, formatPageCount, getImageUrl } from "../utils/helpers";
import { IconlyRemoveBold } from "../components/iconly/bold/IconlyRemoveBold";
import { IconlyPlusBold } from "../components/iconly/bold/IconlyPlusBold";
import { IconlyShareBold } from "../components/iconly/bold/IconlyShareBold";

interface BookDetailScreenProps {
	route: any;
	navigation: any;
}

/**
 * Pantalla de detalle de un libro
 */
export function BookDetailScreen({ route, navigation }: BookDetailScreenProps) {
	const { book: initialBook } = route.params;
	const [book] = useState<Book>(initialBook);
	const [rating, setRating] = useState(0);
	const [isShareLoading, setIsShareLoading] = useState(false);
	const { isFavorite, addFavorite, removeFavorite, updateRating, getFavorite } = useFavorites();

	const bookIsFavorite = isFavorite(book.id);
	const favorite = getFavorite(book.id);

	useEffect(() => {
		if (favorite) {
			setRating(favorite.rating);
		}
	}, [favorite]);

	/**
	 * Manejar agregar/remover favorito
	 */
	const handleToggleFavorite = async () => {
		try {
			if (bookIsFavorite) {
				await removeFavorite(book.id);
				Alert.alert("", MESSAGES.SUCCESS_REMOVED_FAVORITE);
			} else {
				await addFavorite(book);
				Alert.alert("", MESSAGES.SUCCESS_ADDED_FAVORITE);
			}
		} catch (error) {
			Alert.alert("Error", MESSAGES.ERROR_GENERIC);
			console.error("Error toggling favorite:", error);
		}
	};

	/**
	 * Actualización de rating
	 */
	const handleRatingChange = async (newRating: number) => {
		try {
			if (bookIsFavorite) {
				await updateRating(book.id, newRating);
				setRating(newRating);
				Alert.alert("", MESSAGES.SUCCESS_RATING_UPDATED);
			} else {
				await addFavorite(book);
				await updateRating(book.id, newRating);
				setRating(newRating);
				Alert.alert("", MESSAGES.SUCCESS_ADDED_FAVORITE);
			}
		} catch (error) {
			Alert.alert("Error", MESSAGES.ERROR_GENERIC);
			console.error("Error updating rating:", error);
		}
	};

	/**
	 * Manejar compartir
	 */
	const handleShare = async () => {
		setIsShareLoading(true);
		try {
			const online = await connectivityService.isOnline();
			if (!online) {
				Alert.alert("Error", "Necesitas conexión a Internet para compartir");
				return;
			}

			const success = await shareService.shareBook(book);
			if (!success) {
				Alert.alert("", "No hay aplicaciones disponibles para compartir");
			}
		} catch (error) {
			Alert.alert("Error", MESSAGES.ERROR_GENERIC);
			console.error("Error sharing:", error);
		} finally {
			setIsShareLoading(false);
		}
	};

	const imageUrl = getImageUrl(book, "large");

	return (
		<SafeAreaView style={styles.container} edges={[]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Imagen */}
				<View style={styles.imageSection}>
					{imageUrl ? (
						<Image source={{ uri: imageUrl }} style={styles.bookImage} />
					) : (
						<View style={[styles.bookImage, styles.placeholderImage]}>
							<Text style={styles.placeholderText}>📚</Text>
						</View>
					)}
				</View>

				{/* Contenido */}
				<View style={styles.content}>
					{/* Título */}
					<Text style={styles.title}>{book.title}</Text>

					{/* Autores */}
					{book.authors && book.authors.length > 0 && (
						<View style={styles.infoRow}>
							<Text style={styles.label}>{book.authors.length > 1 ? MESSAGES.AUTHORS : MESSAGES.AUTHOR}:</Text>
							<Text style={styles.value}>{formatAuthors(book.authors)}</Text>
						</View>
					)}

					{/* Año de publicación */}
					{book.publishedYear && (
						<View style={styles.infoRow}>
							<Text style={styles.label}>{MESSAGES.PUBLISHED}:</Text>
							<Text style={styles.value}>{book.publishedYear}</Text>
						</View>
					)}

					{/* Editorial */}
					{book.publisher && (
						<View style={styles.infoRow}>
							<Text style={styles.label}>{MESSAGES.PUBLISHER}:</Text>
							<Text style={styles.value}>{book.publisher}</Text>
						</View>
					)}

					{/* Páginas */}
					{book.pageCount && (
						<View style={styles.infoRow}>
							<Text style={styles.label}>{MESSAGES.PAGES}:</Text>
							<Text style={styles.value}>{formatPageCount(book.pageCount)}</Text>
						</View>
					)}

					{/* Idioma */}
					{book.language && (
						<View style={styles.infoRow}>
							<Text style={styles.label}>{MESSAGES.LANGUAGE}:</Text>
							<Text style={styles.value}>{formatLanguage(book.language)}</Text>
						</View>
					)}

					{/* Categorías */}
					{book.categories && book.categories.length > 0 && (
						<View style={styles.categoriesSection}>
							<Text style={styles.label}>{MESSAGES.CATEGORIES}:</Text>
							<View style={styles.categoriesContainer}>
								{book.categories.map((category, index) => (
									<View key={index} style={styles.categoryTag}>
										<Text style={styles.categoryText}>{category}</Text>
									</View>
								))}
							</View>
						</View>
					)}

					{/* Descripción */}
					{book.description && (
						<View style={styles.descriptionSection}>
							<Text style={styles.label}>{MESSAGES.DESCRIPTION}:</Text>
							<Text style={styles.description}>{book.description}</Text>
						</View>
					)}

					{/* Rating */}
					{bookIsFavorite && (
						<View style={styles.ratingSection}>
							<Text style={styles.label}>Mi Puntaje:{bookIsFavorite}</Text>
							<StarRating rating={rating} onRatingChange={handleRatingChange} interactive={true} size="large" showRatingNumber={true} />
						</View>
					)}

					{/* Botones de acción */}
					<View style={styles.actionsContainer}>
						<TouchableOpacity style={[styles.button, bookIsFavorite ? styles.buttonRemove : styles.buttonAdd]} onPress={handleToggleFavorite}>
							<Text style={styles.buttonText}>{bookIsFavorite ? "Quitar favorito" : "Agregar favorito"}</Text>
							{bookIsFavorite ? <IconlyRemoveBold size={22} color={COLORS.surface} /> : <IconlyPlusBold size={22} color={COLORS.surface} />}
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button, styles.buttonShare]} onPress={handleShare} disabled={isShareLoading}>
							{isShareLoading ? <ActivityIndicator color={COLORS.surface} /> : <Text style={styles.buttonText}>Compartir</Text>}
							<IconlyShareBold size={22} color={COLORS.surface} />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingVertical: 0,
	},
	imageSection: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: SPACING.lg,
		backgroundColor: COLORS.surface,
	},
	bookImage: {
		width: 120,
		height: 180,
		borderRadius: BORDER_RADIUS.md,
		...SHADOWS.lg,
	},
	placeholderImage: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
	},
	placeholderText: {
		fontSize: FONT_SIZES["3xl"],
	},
	content: {
		padding: SPACING.md,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.text950,
		marginBottom: SPACING.md,
	},
	infoRow: {
		marginBottom: SPACING.md,
	},
	label: {
		fontSize: FONT_SIZES.base,
		fontWeight: "600",
		color: COLORS.text950,
		marginBottom: SPACING.xs,
	},
	value: {
		fontSize: FONT_SIZES.base,
		color: COLORS.text700,
	},
	categoriesSection: {
		marginVertical: SPACING.md,
	},
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.sm,
	},
	categoryTag: {
		backgroundColor: COLORS.primary,
		borderRadius: BORDER_RADIUS.full,
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
	},
	categoryText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.surface,
		fontWeight: "500",
	},
	descriptionSection: {
		marginVertical: SPACING.md,
	},
	description: {
		fontSize: FONT_SIZES.base,
		color: COLORS.text700,
		lineHeight: 22,
		textAlign: "justify",
	},
	ratingSection: {
		marginVertical: SPACING.md,
		paddingVertical: SPACING.md,
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.md,
		paddingHorizontal: SPACING.md,
	},
	actionsContainer: {
		flexDirection: "column",
		gap: SPACING.md,
		marginTop: SPACING.lg,
		marginBottom: SPACING.xl,
	},
	button: {
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.md,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: SPACING.xs,
		...SHADOWS.md,
	},
	buttonAdd: {
		backgroundColor: COLORS.success,
	},
	buttonRemove: {
		backgroundColor: COLORS.error,
	},
	buttonShare: {
		backgroundColor: COLORS.primary,
	},
	buttonText: {
		fontSize: FONT_SIZES.base,
		fontWeight: "600",
		color: COLORS.surface,
	},
});
