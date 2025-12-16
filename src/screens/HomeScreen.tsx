import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { connectivityService } from "../services/connectivityService";
import { COLORS, SPACING, FONT_SIZES, MESSAGES } from "../utils/constants";

interface HomeScreenProps {
	navigation: any;
}

/**
 * Pantalla de inicio y búsqueda de libros
 */
export function HomeScreen({ navigation }: HomeScreenProps) {
	const [isOnline, setIsOnline] = useState(true);

	/**
	 * Verificar conectividad
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
		<SafeAreaView style={styles.container}>
			<OfflineNotice visible={!isOnline} />

			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Inicio</Text>
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
		paddingVertical: SPACING.md,
		backgroundColor: COLORS.primary,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.surface,
	},
});
