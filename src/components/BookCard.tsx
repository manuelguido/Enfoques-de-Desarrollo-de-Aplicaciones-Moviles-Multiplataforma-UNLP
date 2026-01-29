import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Book } from "../models/Book";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../utils/constants";
import { formatAuthors, formatPublishedYear, getImageUrl } from "../utils/helpers";
import { IconlyFavoriteDuotone } from "./iconly/duotone/IconlyFavoriteDuotone";
import { useFavoriteToggle } from "../hooks/useFavoriteToggle";
import { StarRating } from "../components/StarRating";

interface BookCardProps {
	book: Book;
	onPress: () => void;
	rating?: number;
	showRating?: boolean;
}

export function BookCard({ book, onPress, rating = 0, showRating = false }: BookCardProps) {
	const imageUrl = getImageUrl(book, "small");
	const { toggleFavorite, isFavorite } = useFavoriteToggle();

	const isBookFavorite = isFavorite(book.id);

	return (
		<TouchableOpacity style={[styles.card, isBookFavorite ? styles.favoriteCard : null]} onPress={onPress} activeOpacity={0.7}>
			{/* Icono de favorito */}
			<TouchableOpacity
				style={styles.favoriteIcon}
				onPress={(e) => {
					e.stopPropagation();
					toggleFavorite(book);
				}}
				activeOpacity={0.7}>
				<IconlyFavoriteDuotone size={20} color={isBookFavorite ? COLORS.primary600 : COLORS.text400} />
			</TouchableOpacity>

			{/* Imagen */}
			<View style={styles.imageContainer}>
				{imageUrl ? (
					<Image source={{ uri: imageUrl }} style={styles.image} />
				) : (
					<View style={[styles.image, styles.placeholderImage]}>
						<Text style={styles.placeholderText}>Book</Text>
					</View>
				)}
			</View>

			{/* Información del libro */}
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{book.title}
				</Text>

				<Text style={styles.author} numberOfLines={1}>
					{formatAuthors(book.authors)}
				</Text>

				{book.publishedYear && <Text style={styles.year}>{formatPublishedYear(book.publishedYear)}</Text>}

				{showRating && rating && <StarRating rating={rating} interactive={false} size="small" />}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		position: "relative",
		flexDirection: "row",
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.xl,
		paddingRight: SPACING.md,
		overflow: "visible",
	},
	favoriteCard: {
		borderLeftWidth: 4,
	},
	imageContainer: {
		position: "relative",
		width: 90,
		height: 140,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: BORDER_RADIUS.xl,
		borderBottomLeftRadius: BORDER_RADIUS.xl,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	placeholderImage: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
	},
	placeholderText: {
		fontSize: FONT_SIZES["2xl"],
	},
	favoriteIcon: {
		position: "absolute",
		bottom: 10,
		right: 10,
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.full,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
		shadowColor: COLORS.text950,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
	},
	content: {
		flex: 1,
		paddingVertical: SPACING.sm,
		paddingLeft: SPACING.md,
		justifyContent: "space-between",
	},
	title: {
		fontSize: FONT_SIZES.base,
		fontWeight: "600",
		color: COLORS.text950,
		marginBottom: SPACING.xs,
	},
	author: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text700,
		marginBottom: SPACING.xs,
	},
	year: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text700,
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: SPACING.xs,
	},
	ratingStars: {
		fontSize: FONT_SIZES.sm,
		marginRight: SPACING.xs,
	},
	ratingText: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.primary,
	},
});
