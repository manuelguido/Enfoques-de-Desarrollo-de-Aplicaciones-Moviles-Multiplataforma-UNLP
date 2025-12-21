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
	// Inicio
	WELCOME: "¡Bienvenido a BooksApp!",
	WELCOME_SUBTEXT: "Explora, busca y guarda tus libros favoritos.",

	// Errores
	ERROR_SEARCH_REQUIRED: "Por favor, ingresa un término de búsqueda",
	ERROR_NO_RESULTS: "No se encontraron resultados",
	ERROR_API_FAILURE: "Error al obtener información de la API",
	ERROR_NO_CONNECTION: "No hay conexión a Internet",
	ERROR_LOAD_FAVORITES: "Error al cargar favoritos",
	ERROR_GENERIC: "Ocurrió un error. Intenta nuevamente",

	// Éxito
	SUCCESS_ADDED_FAVORITE: "Agregado a favoritos",
	SUCCESS_REMOVED_FAVORITE: "Removido de favoritos",

	// Avisos
	OFFLINE_MODE: "Modo sin conexión - Solo puedes ver favoritos",
	SEARCH_REQUIRES_CONNECTION: "Necesitas conexión a Internet para buscar",
	LOADING: "Cargando...",
	NO_FAVORITES: "No tienes libros favoritos aún",

	// Pantalla de búsqueda
	SEARCH_PLACEHOLDER: "Buscar libros...",
	SEARCH_TITLE: "Busca un libro para comenzar",
	SEARCH_BUTTON: "Buscar",
	RESULTS_FOUND: (count: number) => `${count} resultado${count !== 1 ? "s" : ""} encontrado${count !== 1 ? "s" : ""}`,

	// Pantalla de detalle
	FAVORITE_BUTTON: "Agregar a favoritos",
	UNFAVORITE_BUTTON: "Quitar de favoritos",
	SHARE_BUTTON: "Compartir",
	AUTHOR: "Autor",
	AUTHORS: "Autores",
	PUBLISHER: "Editorial",
	PUBLISHED: "Publicado",
	PAGES: "Páginas",
	LANGUAGE: "Idioma",
	CATEGORIES: "Categorías",
	DESCRIPTION: "Descripción",
	NO_DESCRIPTION: "Sin descripción disponible",

	// Pantalla de favoritos
	FAVORITES_TITLE: "Mis Favoritos",
	EMPTY_FAVORITES: "No tienes libros marcados como favoritos",
	DELETE_FAVORITE: "¿Deseas quitar este libro de favoritos?",
	CANCEL: "Cancelar",
	DELETE: "Eliminar",
};
