import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RATING_CONFIG } from '../utils/constants';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onRatingChange: (newRating: number) => void;
  interactive?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Componente para mostrar y puntuar un libro
 */
export function StarRating({
  rating,
  maxStars = RATING_CONFIG.MAX,
  onRatingChange,
  interactive = true,
  size = 'medium',
}: StarRatingProps) {
  const starSizes = {
    small: FONT_SIZES.base,
    medium: FONT_SIZES.xl,
    large: FONT_SIZES['3xl'],
  };

  const starSize = starSizes[size];

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isHalf = starValue - rating <= 0.5 && starValue - rating > 0;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (interactive) {
                  onRatingChange(starValue);
                }
              }}
              disabled={!interactive}
              style={styles.star}
            >
              <Text
                style={{
                  fontSize: starSize,
                  opacity: interactive ? 1 : 0.7,
                }}
              >
                {isFilled ? '*' : isHalf ? '+' : '-'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {rating > 0 && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)} / {maxStars}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  star: {
    marginHorizontal: SPACING.xs,
    padding: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text700,
    fontWeight: '600',
  },
});
