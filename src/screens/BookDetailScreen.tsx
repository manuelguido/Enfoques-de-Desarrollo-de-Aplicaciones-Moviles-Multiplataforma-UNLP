import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../models/Book";
import { COLORS, SPACING, FONT_SIZES, MESSAGES, BORDER_RADIUS, SHADOWS } from "../utils/constants";
import { formatAuthors, formatLanguage, formatPageCount, getImageUrl } from "../utils/helpers";

interface BookDetailScreenProps {
	route: any;
	navigation: any;
}

/**
 * Pantalla de detalle de un libro
 */
export function BookDetailScreen({ route }: BookDetailScreenProps) {
	const { book: initialBook } = route.params;
	const [book] = useState<Book>(initialBook);

	const imageUrl = getImageUrl(book, "large");

	return (
		<SafeAreaView style={styles.container}>
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
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
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
	actionsContainer: {
		flexDirection: "column",
		gap: SPACING.md,
		marginTop: SPACING.lg,
		marginBottom: SPACING.xl,
	},
});
