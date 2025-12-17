import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Book } from "../models/Book";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../utils/constants";
import { formatAuthors, formatPublishedYear, getImageUrl } from "../utils/helpers";

interface BookCardProps {
	book: Book;
	onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
	const imageUrl = getImageUrl(book, "small");

	return (
		<TouchableOpacity style={[styles.card]} onPress={onPress} activeOpacity={0.7}>
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

			{/* Información */}
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{book.title}
				</Text>

				<Text style={styles.author} numberOfLines={1}>
					{formatAuthors(book.authors)}
				</Text>

				{book.publishedYear && <Text style={styles.year}>{formatPublishedYear(book.publishedYear)}</Text>}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.md,
		marginHorizontal: SPACING.md,
		marginVertical: SPACING.sm,
		paddingRight: SPACING.md,
		overflow: "hidden",
	},
	imageContainer: {
		position: "relative",
		width: 90,
		height: 140,
		backgroundColor: COLORS.background,
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
});
