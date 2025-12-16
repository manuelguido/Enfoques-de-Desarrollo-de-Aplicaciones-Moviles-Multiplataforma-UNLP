import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { COLORS, FONT_SIZES } from "../utils/constants";
import { IconlyHome } from "../components/iconly/IconlyHome";
import { IconlyFavorite } from "../components/iconly/IconlyFavorite";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Stack de navegación para el inicio y búsqueda
 */
function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					title: "Inicio",
				}}
			/>
			<Stack.Screen
				name="BookDetail"
				component={BookDetailScreen}
				options={({ route }: any) => ({
					title: route.params?.book?.title || "Detalle del Libro",
					headerShown: true,
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
					headerTintColor: COLORS.surface,
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: FONT_SIZES.lg,
					},
				})}
			/>
		</Stack.Navigator>
	);
}

/**
 * Stack de navegación para favoritos
 */
function FavoritesStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name="FavoritesScreen"
				component={FavoritesScreen}
				options={{
					title: "Favoritos",
				}}
			/>
			<Stack.Screen
				name="BookDetailFromFavorites"
				component={BookDetailScreen}
				options={({ route }: any) => ({
					title: route.params?.book?.title || "Detalle del Libro",
					headerShown: true,
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
					headerTintColor: COLORS.surface,
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: FONT_SIZES.lg,
					},
				})}
			/>
		</Stack.Navigator>
	);
}

/**
 * Navegador principal con tabs
 */
export function RootNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: COLORS.primary800,
					tabBarInactiveTintColor: COLORS.textSecondary,
					tabBarStyle: {
						backgroundColor: COLORS.surface,
						borderTopColor: COLORS.border,
						borderTopWidth: 1,
						paddingBottom: 10,
						paddingTop: 10,
						height: 80,
					},
					tabBarLabelStyle: {
						fontSize: FONT_SIZES.xs,
						fontWeight: "500",
					},
				}}>
				<Tab.Screen
					name="Inicio"
					component={HomeStack}
					options={{
						title: "Inicio",
						tabBarIcon: ({ color, size }) => <IconlyHome color={color} size={size} />,
					}}
				/>
				<Tab.Screen
					name="Favoritos"
					component={FavoritesStack}
					options={{
						title: "Favoritos",
						tabBarIcon: ({ color, size }) => <IconlyFavorite color={color} size={size} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export type RootStackParamList = {
	HomeScreen: undefined;
	BookDetail: { book: any };
	FavoritesScreen: undefined;
	BookDetailFromFavorites: { book: any };
};
