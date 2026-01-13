import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT_SIZES, SPACING, RATING_CONFIG } from "../utils/constants";
import { IconlyStarDuotone } from "./iconly/duotone/IconlyStarDuotone";

interface StarRatingProps {
	rating: number;
	maxStars?: number;
	onRatingChange?: (newRating: number) => void;
	interactive?: boolean;
	size?: "small" | "large";
	showRatingNumber?: boolean;
}

/**
 * Componente para mostrar y puntuar un libro
 */
export function StarRating({ rating, maxStars = RATING_CONFIG.MAX, onRatingChange = () => {}, interactive = true, size = "small", showRatingNumber = false }: StarRatingProps) {
	const starSizes = {
		small: FONT_SIZES.base,
		medium: FONT_SIZES.xl,
		large: FONT_SIZES["3xl"],
	};

	const starSize = starSizes[size];

	return (
		<View style={size === "large" ? styles.container : undefined}>
			<View style={styles.starsContainer}>
				{Array.from({ length: maxStars }).map((_, index) => {
					const starValue = index + 1;
					const isFilled = starValue <= Math.floor(rating);

					return (
						<TouchableOpacity
							key={index}
							onPress={() => {
								if (interactive) {
									onRatingChange(starValue);
								}
							}}
							disabled={!interactive}
							style={size === "large" ? styles.star : undefined}>
							<Text
								style={{
									fontSize: starSize,
									opacity: interactive ? 1 : 0.7,
								}}>
								{isFilled ? <IconlyStarDuotone size={starSize} color={COLORS.primary} /> : <IconlyStarDuotone size={starSize} color={COLORS.text600} />}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			{rating > 0 && showRatingNumber && (
				<Text style={styles.ratingText}>
					{rating} / {maxStars}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	starsContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	star: {
		marginHorizontal: SPACING.xs,
		padding: SPACING.xs,
	},
	ratingText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text950,
		fontWeight: "700",
	},
});
