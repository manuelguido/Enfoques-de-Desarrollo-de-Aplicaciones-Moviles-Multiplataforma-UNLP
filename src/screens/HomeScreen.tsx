import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../models/Book";
import { BookCard } from "../components/BookCard";
import { OfflineNotice } from "../components/OfflineNotice";
import { googleBooksAPI } from "../services/googleBooksAPI";
import { connectivityService } from "../services/connectivityService";
import { useFavorites } from "../context/FavoritesContext";
import { COLORS, SPACING, FONT_SIZES, MESSAGES } from "../utils/constants";
import { IconlyBook } from "../components/iconly/IconlyBook";

interface HomeScreenProps {
	navigation: any;
}

/**
 * Pantalla de inicio y búsqueda
 */
export function HomeScreen({ navigation }: HomeScreenProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(false);
	const [isOnline, setIsOnline] = useState(true);
	const { isFavorite } = useFavorites();

	/**
	 * Limpiar búsqueda
	 */
	const handleClearSearch = useCallback(() => {
		setSearchQuery("");
		setBooks([]);
	}, []);

	/**
	 * Manejar búsqueda
	 */
	const handleSearch = useCallback(async () => {
		if (!searchQuery.trim()) {
			Alert.alert("Error", MESSAGES.ERROR_SEARCH_REQUIRED);
			return;
		}

		// Verificar conectividad
		const online = await connectivityService.isOnline();
		if (!online) {
			Alert.alert("Sin conexión", MESSAGES.SEARCH_REQUIRES_CONNECTION);
			return;
		}

		setLoading(true);
		try {
			const results = await googleBooksAPI.searchBooks(searchQuery);

			if (results.length === 0) {
				Alert.alert("Resultados", MESSAGES.ERROR_NO_RESULTS);
			}

			setBooks(results);
		} catch (error) {
			Alert.alert("Error", MESSAGES.ERROR_API_FAILURE);
			console.error("Error en búsqueda:", error);
		} finally {
			setLoading(false);
		}
	}, [searchQuery]);

	/**
	 * Navegar al detalle del libro
	 */
	const handleBookPress = useCallback(
		(book: Book) => {
			navigation.navigate("BookDetailScreen", { book });
		},
		[navigation]
	);

	/**
	 * Verificar conectividad al montar
	 */
	React.useEffect(() => {
		const checkConnectivity = async () => {
			const online = await connectivityService.isOnline();
			setIsOnline(online);
		};

		checkConnectivity();

		const unsubscribe = connectivityService.subscribe((state) => {
			setIsOnline(state.isConnected && state.isInternetReachable !== false);
		});

		return unsubscribe;
	}, []);

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<OfflineNotice visible={!isOnline} />

			{/* Header */}
			<View style={styles.header}>
				<View style={styles.titleContainer}>
					<IconlyBook color={COLORS.primary400} size={32}/>
					<Text style={styles.title}>BooksApp</Text>
				</View>
				<Text style={styles.subtitle}>Buscá los libros que más te gusten y agregalos a tus favoritos.</Text>

				{/* Barra de búsqueda */}
				<View style={styles.searchContainer}>
					<View style={styles.inputWrapper}>
						<TextInput style={styles.searchInput} placeholder={MESSAGES.SEARCH_PLACEHOLDER} value={searchQuery} onChangeText={setSearchQuery} onSubmitEditing={handleSearch} editable={isOnline} placeholderTextColor={COLORS.text700} />
						{searchQuery.length > 0 && (
							<TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
								<Text style={styles.clearButtonText}>✕</Text>
							</TouchableOpacity>
						)}
					</View>
					<TouchableOpacity style={[styles.searchButton, !isOnline ? styles.searchButtonDisabled : null]} onPress={handleSearch} disabled={loading || !isOnline}>
						<Text style={styles.searchButtonText}>{MESSAGES.SEARCH_BUTTON}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Resultados */}
			<View style={styles.listContainer}>
				{books.length > 0 && <Text style={styles.resultsInfo}>{MESSAGES.RESULTS_FOUND(books.length)}</Text>}

				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={COLORS.primary} />
					</View>
				) : (
					<FlatList
						data={books}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <BookCard book={item} onPress={() => handleBookPress(item)} isFavorite={isFavorite(item.id)} />}
						contentContainerStyle={styles.listContent}
						ListEmptyComponent={
							books.length === 0 ? (
								<View style={styles.emptyContainer}>
									<Text style={styles.emptyText}>Busca un libro para comenzar</Text>
									<Text style={styles.emptyMessage}>{isOnline ? "Ingresa un término de búsqueda" : MESSAGES.OFFLINE_MODE}</Text>
								</View>
							) : null
						}
					/>
				)}
			</View>
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
		paddingVertical: SPACING.lg,
		backgroundColor: "#ffffff",
		// borderBottomRightRadius: 16,
		// borderBottomLeftRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: "#444444",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.sm,
		marginBottom: SPACING.sm,
	},
	subtitle: {
		fontSize: FONT_SIZES.base,
		fontWeight: "medium",
		color: COLORS.text900,
		marginBottom: SPACING.lg,
	},
	searchContainer: {
		flexDirection: "row",
		gap: SPACING.sm,
	},
	inputWrapper: {
		flex: 1,
		position: "relative",
	},
	searchInput: {
		backgroundColor: COLORS.surface,
		borderRadius: 100,
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		paddingRight: 40,
		fontSize: FONT_SIZES.base,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	clearButton: {
		position: "absolute",
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
	},
	clearButtonText: {
		fontSize: FONT_SIZES.xl,
		color: COLORS.text700,
		fontWeight: "bold",
	},
	searchButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 100,
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.lg,
		justifyContent: "center",
		alignItems: "center",
		minWidth: 50,
	},
	searchButtonDisabled: {
		backgroundColor: COLORS.text700,
		opacity: 0.6,
	},
	searchButtonText: {
		fontSize: FONT_SIZES.lg,
		color: "#ffffff",
		fontWeight: "bold",
	},
	listContainer: {
		flex: 1,
		paddingTop: SPACING.lg,
	},
	resultsInfo: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text700,
		paddingHorizontal: SPACING.md,
		marginBottom: SPACING.sm,
	},
	listContent: {
		paddingBottom: 100,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: SPACING["2xl"],
	},
	emptyText: {
		fontSize: FONT_SIZES["3xl"],
		marginBottom: SPACING.md,
	},
	emptyMessage: {
		fontSize: FONT_SIZES.base,
		color: COLORS.text700,
		textAlign: "center",
	},
});
