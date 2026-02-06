/**
 * Constantes de la aplicación
 */

// Colores
export const COLORS = {
	primary: "#fc642d",
	primary50: "#fff4ed",
	primary100: "#ffe5d5",
	primary200: "#ffc7a9",
	primary300: "#fea073",
	primary400: "#fc642d",
	primary500: "#fa4915",
	primary600: "#eb2f0b",
	primary700: "#c31f0b",
	primary800: "#9b1b11",
	primary900: "#7d1911",
	primary950: "#430907",

	text50: "#f6f6f6",
	text100: "#e7e7e7",
	text200: "#d1d1d1",
	text300: "#b0b0b0",
	text400: "#888888",
	text500: "#6d6d6d",
	text600: "#5d5d5d",
	text700: "#4f4f4f",
	text800: "#454545",
	text900: "#3d3d3d",
	text950: "#191919",

	success: "#00a699",
	warning: "#fc642d",
	error: "#ff5a5f",

	background: "#F1F3F5",
	surface: "#FFFFFF",

	border: "#E0E0E0",
	overlay: "rgba(0, 0, 0, 0.5)",
};

// Tamaños de fuente
export const FONT_SIZES = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
	xl: 20,
	"2xl": 24,
	"3xl": 30,
};

// Espaciado
export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 24,
	xl: 32,
	"2xl": 48,
};

// Border radius
export const BORDER_RADIUS = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	full: 9999,
};

// Sombras
export const SHADOWS = {
	sm: {
		elevation: 2,
	},
	md: {
		elevation: 4,
	},
	lg: {
		elevation: 8,
	},
	xl: {
		elevation: 12,
	},
};

// Textos
export const MESSAGES = {
	// Errores
	ERROR_SEARCH_REQUIRED: "Por favor, ingresa un término de búsqueda",
	ERROR_NO_RESULTS: "No se encontraron resultados",
	ERROR_API_FAILURE: "Error al obtener información de la API",
	ERROR_GENERIC: "Ocurrió un error. Intenta nuevamente",

	// Éxito
	SUCCESS_ADDED_FAVORITE: "Agregado a favoritos",
	SUCCESS_REMOVED_FAVORITE: "Removido de favoritos",

	// Avisos
	OFFLINE_MODE: "Modo sin conexión - Solo puedes ver favoritos",
	SEARCH_REQUIRES_CONNECTION: "Necesitas conexión a Internet para buscar",
	NO_FAVORITES: "No tienes libros favoritos aún",

	// Pantalla de búsqueda
	SEARCH_PLACEHOLDER: "Buscar libros...",
	SEARCH_TITLE: "Busca un libro para comenzar",
	SEARCH_SUBTITLE: "Ingresa un término de búsqueda",
	SEARCH_BUTTON: "Buscar",
	RESULTS_FOUND: (count: number) => `${count} resultado${count !== 1 ? "s" : ""} encontrado${count !== 1 ? "s" : ""}`,

	// Pantalla de detalle
	AUTHOR: "Autor",
	AUTHORS: "Autores",
	PUBLISHER: "Editorial",
	PUBLISHED: "Publicado",
	PAGES: "Páginas",
	LANGUAGE: "Idioma",
	CATEGORIES: "Categorías",
	DESCRIPTION: "Descripción",

	// Navegación
	NAV_HOME: "Inicio",
	NAV_FAVORITES: "Favoritos",
	BOOK_DETAIL_TITLE: "Detalle del Libro",

	// Favoritos específico
	FAVORITES_TITLE: "Mis Favoritos",
	FAVORITES_COUNT_SINGLE: "Tienes 1 libro en favoritos.",
	FAVORITES_COUNT_MULTIPLE: (count: number) => `Tienes ${count} libros en favoritos.`,
	FAVORITES_HELP_TEXT: "Los libros que marques como favorito aparecerán aquí",
	FAVORITES_FOOTER_TEXT: "Ve al inicio para buscar libros y agregar a tus favoritos.",
	MY_RATING: "Mi Puntaje:",
	ADD_TO_FAVORITES: "Agregar favorito",
	REMOVE_FROM_FAVORITES: "Quitar favorito",
	SHARE: "Compartir",

	// Alertas/Confirmaciones
	CONFIRM_REMOVE_FAVORITE: "Eliminar de favoritos",
	CONFIRM_REMOVE_MESSAGE: (title: string) => `¿Estás seguro que deseas quitar "${title}" de tus favoritos?`,
	SUCCESS_BOOK_ADDED: (title: string) => `"${title}" fue agregado a favoritos`,
	ERROR_ADD_FAVORITE: "No se pudo agregar a favoritos",
	ERROR_INTERNET_REQUIRED: "Necesitas conexión a Internet para compartir",
	ERROR_NO_SHARE_APPS: "No hay aplicaciones disponibles para compartir",
	CANCEL: "Cancelar",
	DELETE: "Eliminar",

	// Conexión
	OFFLINE_NOTICE: "Sin conexion a Internet",

	// Errores generales del contexto
	ERROR_UNKNOWN: "Error desconocido",
	ERROR_ADD_FAVORITES_CONTEXT: "Error al agregar a favoritos",
	ERROR_REMOVE_FAVORITES_CONTEXT: "Error al remover de favoritos",
	ERROR_UPDATE_RATING_CONTEXT: "Error al actualizar rating",
	ERROR_CONTEXT_OUTSIDE_PROVIDER: "useFavorites debe usarse dentro de FavoritesProvider",

	// Placeholders
	BOOK_PLACEHOLDER: "Book",
};

// Configuración de ratings
export const RATING_CONFIG = {
	MAX: 5,
};
