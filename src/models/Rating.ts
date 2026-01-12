/**
 * Modelo para la valoración de un libro
 */
export interface Rating {
	bookId: string;
	rating: number;
	createdAt: number;
	updatedAt: number;
}

/**
 * Crear un Rating para un libro
 */
export function createRating(bookId: string, rating: number): Rating {
	const now = Date.now();
	return {
		bookId,
		rating: Math.max(0, Math.min(5, rating)),
		createdAt: now,
		updatedAt: now,
	};
}

/**
 * Actualizar el valor de un Rating
 */
export function updateRatingValue(rating: Rating, newValue: number): Rating {
	return {
		...rating,
		rating: Math.max(0, Math.min(5, newValue)),
		updatedAt: Date.now(),
	};
}
